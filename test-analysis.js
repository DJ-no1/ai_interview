// Test script to set up localStorage for testing analysis page
const testApplication = {
  id: "test-app-123",
  jobId: "1",
  jobTitle: "Senior Frontend Developer",
  resumeFileName: "test-resume.pdf",
  candidateName: "Test User",
  submittedAt: new Date().toISOString(),
};

// Set the data in localStorage
localStorage.setItem("currentApplication", JSON.stringify(testApplication));

console.log("Test application data set in localStorage:");
console.log(JSON.parse(localStorage.getItem("currentApplication")));

// Now you can visit: http://localhost:3000/candidates/application/test-app-123/analysis
