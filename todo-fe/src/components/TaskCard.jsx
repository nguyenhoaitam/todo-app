export default function TaskCard({ task}) {
  return (
    <div className="bg-white shadow p-3 rounded flex justify-between items-center">
      <span>{task.title}</span>
    </div>
  );
}

// export default function TaskCard({ task, delTask }) {
//   return (
//     <div className="bg-white shadow p-3 rounded flex justify-between items-center">
//       <span>{task.title}</span>
//       <button
//         className="bg-button text-white px-3 py-1 rounded"
//         onClick={() => delTask(task._id)}
//       >
//         Xóa
//       </button>
//     </div>
//   );
// }

