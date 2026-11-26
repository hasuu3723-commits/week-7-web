
// Store the budget and expenses
let monthlyBudget = 2000;

let expenses = [
    { category: "Food", amount: 300 },
    { category: "Transport", amount: 100 },
    { category: "Rent", amount: 600 },
    { category: "Entertainment", amount: 100 },
    { category: "Savings", amount: 200 },
    { category: "Utilities", amount: 150 }
];

// Format money
function formatMoney(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(amount);
}

// Calculate total expenses using a loop
function calculateTotal() {
    let total = 0;

    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }

    return total;
}

// Display expenses on the webpage
function displayExpenses() {
    const expenseList = document.getElementById("expenseList");

    expenseList.innerHTML = "";

    for (let i = 0; i < expenses.length; i++) {
        const item = document.createElement("div");

        item.className = "expense-item";

        item.innerHTML = `
            <span>${expenses[i].category}</span>
            <strong>${formatMoney(expenses[i].amount)}</strong>
        `;

        expenseList.appendChild(item);
    }
}

// Update dashboard information
function updateDashboard() {
    const total = calculateTotal();
    const remaining = monthlyBudget - total;
    const percentage = monthlyBudget > 0
        ? (total / monthlyBudget) * 100
        : 0;

    document.getElementById("budget").textContent =
        formatMoney(monthlyBudget);

    document.getElementById("totalExpenses").textContent =
        formatMoney(total);

    document.getElementById("remaining").textContent =
        formatMoney(remaining);

    // Conditional statements
    const status = document.getElementById("status");
    const progressBar = document.getElementById("progressBar");

    if (monthlyBudget === 0) {
        status.textContent = "Please enter a budget greater than zero.";
        progressBar.style.width = "0%";
    } else if (total > monthlyBudget) {
        status.textContent = "Warning! You have exceeded your budget.";
        progressBar.style.width = "100%";
    } else if (percentage >= 80) {
        status.textContent = "Careful! You have used most of your budget.";
        progressBar.style.width = percentage + "%";
    } else {
        status.textContent = "Great! You are managing your budget well.";
        progressBar.style.width = percentage + "%";
    }

    progressBar.style.background =
        total > monthlyBudget ? "#dc2626" :
        percentage >= 80 ? "#f59e0b" : "#16a34a";

    // Display financial report
    document.getElementById("report").innerHTML = `
        <p>Monthly Budget: ${formatMoney(monthlyBudget)}</p>
        <p>Total Expenses: ${formatMoney(total)}</p>
        <p>Remaining Balance: ${formatMoney(remaining)}</p>
        <p>Budget Used: ${percentage.toFixed(1)}%</p>
        <p>Number of Records: ${expenses.length}</p>
    `;

    displayExpenses();

    console.log("Financial Report");
    console.log("Monthly Budget:", formatMoney(monthlyBudget));
    console.log("Total Expenses:", formatMoney(total));
    console.log("Remaining Balance:", formatMoney(remaining));
}

// Handle form submission using an event listener
document.getElementById("budgetForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const budget = Number(document.getElementById("monthlyBudget").value);

    const categories = [
        { category: "Food", id: "food" },
        { category: "Transport", id: "transport" },
        { category: "Rent", id: "rent" },
        { category: "Entertainment", id: "entertainment" },
        { category: "Savings", id: "savings" },
        { category: "Utilities", id: "utilities" }
    ];

    if (!Number.isFinite(budget) || budget <= 0) {
        document.getElementById("message").textContent =
            "Please enter a valid budget greater than zero.";
        return;
    }

    let newExpenses = [];

    for (let i = 0; i < categories.length; i++) {
        const amount = Number(
            document.getElementById(categories[i].id).value
        );

        if (!Number.isFinite(amount) || amount < 0) {
            document.getElementById("message").textContent =
                "Please enter valid, non-negative expense amounts.";
            return;
        }

        newExpenses.push({
            category: categories[i].category,
            amount: amount
        });
    }

    // Update stored data
    monthlyBudget = budget;
    expenses = newExpenses;

    // Update the webpage
    updateDashboard();

    document.getElementById("message").textContent =
        "Your budget has been updated successfully!";
});

// Display initial dashboard
updateDashboard();
