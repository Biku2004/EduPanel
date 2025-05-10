const express = require("express");
const router = express.Router();
const { db, bucket } = require("../config/firebase");
const { authenticate, restrictTo } = require("../middleware/auth");

// Get all job postings
router.get("/", authenticate, async (req, res) => {
  const { batchYear } = req.query;
  try {
    let query = db.collection("jobs");
    if (batchYear) {
      query = query.where("batchYear", "==", batchYear);
    }
    const snapshot = await query.get();
    const jobs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a job posting
router.post("/", authenticate, restrictTo("Recruiter"), async (req, res) => {
  const {
    companyName,
    website,
    companyProfile,
    eligibleCourses,
    batchYear,
    jobRole,
    jobLocation,
    annualCTC,
    rolesResponsibilities,
    skillsQualifications,
    selectionProcess,
    registrationProcess,
    lastDateToRegister,
    benefitsIncentives,
    roleDetails,
    expectedSkillsTools,
    additionalSections,
    logoUrl,
  } = req.body;

  try {
    const jobRef = await db.collection("jobs").add({
      companyName,
      website,
      companyProfile,
      eligibleCourses,
      batchYear,
      jobRole,
      jobLocation,
      annualCTC,
      rolesResponsibilities,
      skillsQualifications,
      selectionProcess,
      registrationProcess,
      lastDateToRegister,
      benefitsIncentives,
      roleDetails,
      expectedSkillsTools,
      additionalSections: additionalSections || [],
      logoUrl,
      status: "Open",
      isHidden: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ id: jobRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update job posting
router.put("/:id", authenticate, restrictTo("Recruiter"), async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const jobRef = db.collection("jobs").doc(id);
    const doc = await jobRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Job not found" });
    }

    await jobRef.update({
      ...data,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(200).json({ id, ...data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete job posting
router.delete("/:id", authenticate, restrictTo("Recruiter"), async (req, res) => {
  const { id } = req.params;

  try {
    const jobRef = db.collection("jobs").doc(id);
    const doc = await jobRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Job not found" });
    }

    await jobRef.delete();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload company logo
router.post("/upload-logo", authenticate, restrictTo("Recruiter"), async (req, res) => {
  const file = req.files?.logo;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const fileName = `${Date.now()}-${file.name}`;
    const fileUpload = bucket.file(`logos/${fileName}`);
    await fileUpload.save(file.data, {
      metadata: { contentType: file.mimetype },
    });
    const [url] = await fileUpload.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });
    res.status(200).json({ logoUrl: url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;