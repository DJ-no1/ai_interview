// Debug script to set up test application data
const testApplication = {
  id: "debug-app-123",
  jobId: "frontend-dev",
  jobTitle: "Senior Frontend Developer",
  resumeFileName: "john_doe_resume.pdf",
  candidateName: "John Doe",
  submittedAt: new Date().toISOString(),
};

// Store in localStorage
localStorage.setItem("currentApplication", JSON.stringify(testApplication));

console.log("Test application data stored:", testApplication);
console.log("Navigate to: /candidates/application/debug-app-123/analysis");
