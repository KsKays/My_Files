// script.js
function createButton(label, onClick) {
  const button = document.createElement("button");
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function createTreeElement(item) {
  const element = document.createElement("div");
  element.textContent = item.name;
  element.classList.add(item.type);

  const addFolderButton = createButton("Add Folder", () => {
    const folderName = prompt("Enter folder name:");
    if (folderName) {
      const newFolder = { name: folderName, type: "folder", children: [] };
      item.children.push(newFolder);
      const folderElement = createTreeElement(newFolder);
      element.appendChild(folderElement);
    }
  });
  element.appendChild(addFolderButton);

  const addFileButton = createButton("Add File", () => {
    const fileName = prompt("Enter file name:");
    if (fileName) {
      const newFile = { name: fileName, type: "file" };
      item.children.push(newFile);
      const fileElement = createTreeElement(newFile);
      element.appendChild(fileElement);
    }
  });
  element.appendChild(addFileButton);

  const deleteButton = createButton("Delete", () => {
    if (confirm("Are you sure you want to delete this item?")) {
      element.parentElement.removeChild(element);
      // Remove item from parent's children list
      const index = item.parent.children.indexOf(item);
      if (index !== -1) {
        item.parent.children.splice(index, 1);
      }
    }
  });
  element.appendChild(deleteButton);

  if (item.type === "folder" && item.children) {
    item.children.forEach((child) => {
      const childElement = createTreeElement(child);
      element.appendChild(childElement);
    });
  }

  return element;
}

const folderStructure = {
  name: "Root",
  type: "folder",
  children: [
    {
      name: "Folder 1",
      type: "folder",
      children: [
        { name: "File 1.txt", type: "file" },
        { name: "File 2.txt", type: "file" },
      ],
    },
    {
      name: "Folder 2",
      type: "folder",
      children: [{ name: "File 3.txt", type: "file" }],
    },
  ],
};

const folderTree = document.getElementById("folderTree");
const treeElement = createTreeElement(folderStructure);
folderTree.appendChild(treeElement);
