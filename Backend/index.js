import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import sdk, { InputFile } from "node-appwrite";
import Passage from "@passageidentity/passage-node";

const PORT = process.env.PORT;
const ORIGIN = process.env.ORIGIN;
const ENDPOINT = process.env.APP_WRITE_ENDPOINT;
const PROJECT_ID = process.env.APP_WRITE_PROJECT_ID;
const KEY = process.env.APP_WRITE_KEY;
const DATABASE_ID = process.env.DATABASE_ID;
const BUCKET_ID = process.env.BUCKET_ID;
const PASSAGE_CONFIG = {
  appID: process.env.PASSAGE_APP_ID,
  apiKey: process.env.PASSAGE_API_KEY,
  authStrategy: "HEADER",
};

const passage = new Passage(PASSAGE_CONFIG);
const client = new sdk.Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(KEY);
const databases = new sdk.Databases(client);
const storage = new sdk.Storage(client);
const app = express();

// CORS Handler
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/getFileDetails/:id", async (req, res) => {
  const COLLECTION_ID = process.env.FILE_DATA_COLLECTION;
  const FILE_ID = req.params.id;
  const fidQuerry = sdk.Query.equal("fid", [FILE_ID]);
  const sharedQuerry = sdk.Query.equal("is_shared", [true]);
  const QUERRIES = [fidQuerry, sharedQuerry];
  let response;
  try {
    response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      QUERRIES
    );
    if (response.total > 0) {
      let finalDocuments = response.documents.find((el) => !el.is_deleted);
      if (finalDocuments) {
        finalDocuments = [finalDocuments]
      }
      else {
        finalDocuments = []
      }
      response.total = finalDocuments.length;
      response.documents = finalDocuments;
    }
    res.send(response);
  } catch (error) {
    response = error;
    res.status(error.code).json(response);
  }
});

app.get("/getFile/:id", async (req, res) => {
  const FILE_ID = req.params.id;
  let response;
  try {
    if (!FILE_ID) {
      throw { code: 404, message: "Not found" };
    }
    response = await storage.getFileDownload(BUCKET_ID, FILE_ID);
    res.send(response);
  } catch (error) {
    response = error;
    res.status(error.code).json(response);
  }
});

// Auth Handler
app.use(async (req, res, next) => {
  if (!req.headers.authorization) {
    next();
  } else {
    try {
      let UID = await passage.authenticateRequest(req);
      if (UID) {
        req.UID = UID;
        next();
      }
    } catch (e) {
      res.status(401).send("Unauthorized User");
    }
  }
});

app.post(
  "/uploadFile/:id",
  express.raw({ type: "*/*", limit: "10mb" }),
  async (req, res) => {
    let response;
    try {
      const fileName = req.params.id;
      const fileBlob = req.body;
      if (
        fileName == undefined ||
        fileName == null ||
        fileName == undefined ||
        fileName == null
      ) {
        throw { code: 400, message: "Parameters are required" };
      }
      response = await storage.createFile(
        BUCKET_ID,
        sdk.ID.unique(),
        InputFile.fromBuffer(fileBlob, fileName)
      );
      res.json(response);
    } catch (error) {
      response = error;
      res.status(error.code).json(response);
    }
  }
);

app.use(bodyParser.json({ limit: "10mb" }));

app.get("/healthcheck", (req, res) => {
  res.json({ message: "lub dub" });
});

app.get("/getDocuments", async (req, res) => {
  const UID = req.UID;
  const ORDER = req.query.order || "asc";
  const FAV = req.query.favourite;
  const TRASH = req.query.trash;
  const sortByQuerry =
    ORDER === "desc"
      ? sdk.Query.orderDesc("$updatedAt")
      : sdk.Query.orderAsc("$createdAt");
  const favQuerry = FAV ? sdk.Query.equal("fav", [true]) : undefined;
  const trashQuerry = TRASH ? sdk.Query.equal("is_deleted", [true]) : undefined;
  const uidQuerry = sdk.Query.equal("uid", [UID]);
  const QUERRIES = [uidQuerry, favQuerry, trashQuerry, sortByQuerry];
  const COLLECTION_ID = process.env.FILE_DATA_COLLECTION;
  let response;
  try {
    response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      QUERRIES
    );
    if (!TRASH && response.total > 0) {
      let finalDocuments = response.documents.filter((el) => !el.is_deleted);
      response.total = finalDocuments.length;
      response.documents = finalDocuments;
    }
    res.json(response);
  } catch (error) {
    response = error;
    res.status(error.code).json(response);
  }
});

app.post("/completFileUpload", async (req, res) => {
  const UID = req.UID;
  const COLLECTION_ID = process.env.FILE_DATA_COLLECTION;
  let response;
  try {
    const { fid, file_name, description, extension } = req.body;
    if (!fid || !file_name || !extension) {
      throw { code: 400, message: "not allowed" };
    }
    const payload = { uid: UID, fid, file_name, extension, description };
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      sdk.ID.unique(),
      payload
    );
    res.json(response);
  } catch (error) {
    response = error;
    res.status(error.code).json(response);
  }
});

const patchDocument = async (DOCUMENT_ID, COLLECTION_ID, data) => {
  let response;
  try {
    response = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      DOCUMENT_ID,
      data
    );
  } catch (error) {
    response = error;
  }
  return response;
};

app.patch("/delete/:id", async (req, res) => {
  const DOCUMENT_ID = req.params.id;
  const COLLECTION_ID = process.env.FILE_DATA_COLLECTION;
  const { del } = req.body;
  if (del == undefined || del == null) {
    res.status(400).json({ message: "Not allowed" });
  } else {
    let payload = { is_deleted: del };
    let response = await patchDocument(DOCUMENT_ID, COLLECTION_ID, payload);
    res.json(response);
  }
});

app.patch("/favorite/:id", async (req, res) => {
  const DOCUMENT_ID = req.params.id;
  const COLLECTION_ID = process.env.FILE_DATA_COLLECTION;
  const { fav } = req.body;
  if (fav == undefined || fav == null) {
    res.status(400).json({ message: "Not allowed" });
  } else {
    let payload = { fav };
    let response = await patchDocument(DOCUMENT_ID, COLLECTION_ID, payload);
    res.json(response);
  }
});

app.patch("/share/:id", async (req, res) => {
  const DOCUMENT_ID = req.params.id;
  const COLLECTION_ID = process.env.FILE_DATA_COLLECTION;
  const { is_shared } = req.body;
  if (is_shared == undefined || is_shared == null) {
    res.status(400).json({ message: "Not allowed" });
  } else {
    let payload = { is_shared };
    let response = await patchDocument(DOCUMENT_ID, COLLECTION_ID, payload);
    res.json(response);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
