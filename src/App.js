import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import * as ynab from "ynab";

const accessToken = "<access-token>";
const ynabAPI = new ynab.API(accessToken);
const budgetId = "<budget-id>";
const accountId = "<account-id>";
const categoryId = "<category-id>";

function App() {
  useEffect(() => {
    async function createAndDeleteTransaction() {
      try {
        // create transaction
        const txn = await ynabAPI.transactions.createTransaction(budgetId, {
          transaction: {
            account_id: accountId,
            category_id: categoryId,
            payee_id: null,
            cleared: "cleared",
            approved: true,
            date: ynab.utils.getCurrentDateInISOFormat(),
            amount: -23430,
            memo: "Dry Cleaning",
          },
        });
        // wait 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // delete transaction
        await ynabAPI.transactions.deleteTransaction(
          budgetId,
          txn.data.transaction.id
        );
      } catch (err) {
        const error = err.error;
        if (!error) {
          console.error(err);
          return;
        }

        console.error(
          `ERROR: id=${error.id}; name=${error.name}; detail: ${error.detail}`
        );
      }
    }

    createAndDeleteTransaction();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
