const firestore = require('../config/db');
const Project = require('../models/project');

// const addProject = async (req, res) => {
//   try {
//     const data = req.body;
//     await firestore.collection("project").doc().set(data);
//     res.status(201).json({ message: "Record saved successfully" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const getAllProjects = async (req, res) => {
//   try {
//     const projects = firestore.collection("project");
//     const data = await projects.get();
//     const arr = [];
//     if (data.empty) {
//       res.status(200).json({ message: "No records found" });
//     } else {
//       let total = 0;
//       data.forEach((item) => {
//         const project = new Project(
//           item.data().project_name,
//           item.id,
//           item.data().story_list,
//         );
//         arr.push(project);
//         total = total + 1;
//       });
//       res.status(200).json({
//         listing: arr,
//         count: total
//       });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const getProject = async (req, res) => {
//   try {
//     const projects = firestore.collection("project");
//     const data = await projects.doc(req.params.id).get();
//     const projectResult = [];
//     if (data.empty) {
//       res.status(200).json({ message: "No records found" });
//     } else {
//       data.forEach((item) => {
//         const project = new Project(
//           item.data().project_name,
//           item.id,
//           item.data().story_list,
//         );

//         projectResult.push(project);
//       });
//       res.status(200).json({projectResult})
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const updateProject = async (req, res) => {
//   try {
//     const data = req.body;
//     const projectUpdate = firestore.collection("project").doc(req.params.id);
//     await projectUpdate.update(data)
//     res.status(201).json({ message: "Record updated successfully" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports = {
//   addProject,
//   updateProject,
//   getAllProjects,
//   getProject
// }
