import React from 'react';
import './App.css';
import axios from "axios";

const backendUrl = "http://localhost:3001/";

function App() {
  return (
    <div className="App">
        <h1>Banking App Frontend - Dev Page</h1>
        <div>
          <ul>
            <li><button onClick={getAccounts}>Get All Accounts</button></li>
          </ul>
        </div>
      <div>
        <ul id={"acclist"}>
            Results:
        </ul>
      </div>
    </div>
  );
}

function getAccounts() {
    console.log("Getting accounts");
    axios.get(backendUrl + "account/all-test")
        .then(res => {
          // Add the accounts to the list
            const accounts = res.data;
            const list = document.getElementById("acclist");
            // Clear the list
            list!.innerHTML = "";
            accounts.forEach((account:any) => {
                const item = document.createElement("li");

                let button = document.createElement("button");
                button.innerHTML = "View Account";
                button.onclick = () => {updateAccountPage(account.account_id);}
                item.appendChild(button);

                // Name and surname can be bolded
                let name = document.createElement("b");
                name.innerHTML = account.name + " " + account.surname;
                item.appendChild(name);

                // Account ID can be italicised
                let id = document.createElement("i");
                id.innerHTML = " " + account.account_id;
                item.appendChild(id);

                // Email can be blue and clickable
                let email = document.createElement("a");
                email.innerHTML = " " + account.email;
                email.href = "mailto:" + account.email;
                email.style.color = "blue";
                item.appendChild(email);

                // Line up the buttons on every list item
                item.style.display = "flex";
                item.style.justifyContent = "space-between";
                // Add a line between each list item
                item.style.borderBottom = "1px solid black";
                // Add more space between the list items
                item.style.padding = "10px";
                // Add the list item to the list
                list?.appendChild(item);
            });
        })
        .catch(err => {
          console.log(err);
        });
}

function updateAccount(account_id: string) {
    console.log("Updating account " + account_id);
    axios.put(backendUrl + "account/")
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
}

function deleteAccount(account_id: string) {
    console.log("Deleting account " + account_id);
    axios.delete(backendUrl + "account/")
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
}

function getAccount(account_id: string): any {
    // Return a promise
    return axios.get(backendUrl + "account/", {params: {account_id: account_id}});
}

async function updateAccountPage(account_id: string) {
    // When the user clicks on a button, create and open the modal
    const modal = document.createElement("div");
    modal.id = "modal";
    modal.style.position = "fixed";
    modal.style.zIndex = "1";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.overflow = "auto";
    modal.style.backgroundColor = "rgb(0,0,0)";
    modal.style.backgroundColor = "rgba(0,0,0,0.4)";
    document.body.appendChild(modal);

    // Create the modal content
    const modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "#fefefe";
    modalContent.style.margin = "15% auto";
    modalContent.style.padding = "20px";
    modalContent.style.border = "1px solid #888";
    modalContent.style.width = "80%";
    modal.appendChild(modalContent);

    // Create the close button
    const close = document.createElement("span");
    close.innerHTML = "&times;";
    close.style.color = "#aaaaaa";
    close.style.float = "right";
    close.style.fontSize = "28px";
    close.style.fontWeight = "bold";
    close.onclick = () => {
        modal.style.display = "none";
    }
    modalContent.appendChild(close);

    // Create the header
    const header = document.createElement("h2");
    header.innerHTML = "Account Details";
    modalContent.appendChild(header);

    // Create the account details
    const details = document.createElement("p");
    // The data will be in editable text fields, and filled in with the account details
    console.log("Getting account details");
    const acc = await getAccount(account_id);
    const account = acc.data
    console.log(account);

    // Iterate through the account details and create a text field for each in a list
    const list = document.createElement("ul");

    for (const [key, value] of Object.entries(account)) {
        const item = document.createElement("li");
        item.innerHTML = key + ": ";
        const field = document.createElement("input");
        field.type = "text";
        if (typeof value === "string") {
            field.value = value;
        }
        item.appendChild(field);
        list.appendChild(item);
    }
    details.appendChild(list);
    modalContent.appendChild(details);

    // Create the buttons
    const buttons = document.createElement("div");
    buttons.style.display = "flex";
    buttons.style.justifyContent = "space-between";
    modalContent.appendChild(buttons);

    // Create the update button
    const update = document.createElement("button");
    update.innerHTML = "Update Account";
    update.onclick = () => {
        updateAccount(account_id);
    }
    buttons.appendChild(update);

    // Create the delete button
    const del = document.createElement("button");
    del.innerHTML = "Delete Account";
    del.onclick = () => {
        deleteAccount(account_id);
    }
    buttons.appendChild(del);
}

export default App;
