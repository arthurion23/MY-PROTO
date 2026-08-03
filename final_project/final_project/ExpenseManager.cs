using System;
using System.Collections.Generic;

namespace final_project
{
    class ExpenseManager
    {  
        GenericStore<Expense> store;

        public List<Expense> Expenses
        {
            set
            {
                if (value != null)
                    store.Items = value;
                else
                    store.Items = new List<Expense>();
            }
            get
            {
                return store.Items;
            }
        }

        public ExpenseManager()
        {
            store = new GenericStore<Expense>();
        }

        public void AddExpense(Expense expense)
        {
            if (expense == null)
            {
                Console.WriteLine("Invalid Expense");
            }
            else if (expense.Amount <= 0)
            {
                Console.WriteLine("Amount Must Be Greater Than Zero");
            }
            else
            {
                store.Add(expense);
                Console.WriteLine("Expense Added Successfully");
            }
        }

        public Expense SearchExpenseByID(int id)
        {
            if (id <= 0)
            {
                Console.WriteLine("Invalid Expense ID");
                return null;
            }

            for (int i = 0; i < Expenses.Count; i++)
            {
                if (Expenses[i].ExpenseID == id)
                    return Expenses[i];
            }

            return null;
        }

        public void EditExpense(int id, double amount, string category, string description, string date)
        {
            if (id <= 0)
            {
                Console.WriteLine("Invalid Expense ID");
                return;
            }

            if (amount <= 0)
            {
                Console.WriteLine("Amount Must Be Greater Than Zero");
                return;
            }

            if (category == "")
            {
                Console.WriteLine("Category Cannot Be Empty");
                return;
            }

            if (description == "")
            {
                Console.WriteLine("Description Cannot Be Empty");
                return;
            }

            if (date == "")
            {
                Console.WriteLine("Date Cannot Be Empty");
                return;
            }

            Expense expense = SearchExpenseByID(id);

            if (expense == null)
            {
                Console.WriteLine("Expense Not Found");
            }
            else
            {
                expense.Amount = amount;
                expense.Category = category;
                expense.Description = description;
                expense.Date = date;

                Console.WriteLine("Expense Updated Successfully");
            }
        }

        public void DeleteExpense(int id)
        {
            if (id <= 0)
            {
                Console.WriteLine("Invalid Expense ID");
                return;
            }

            Expense expense = SearchExpenseByID(id);

            if (expense == null)
            {
                Console.WriteLine("Expense Not Found");
            }
            else
            {
                store.Remove(expense);
                Console.WriteLine("Expense Deleted Successfully");
            }
        }

        public void ViewAllExpenses()
        {
            if (Expenses.Count == 0)
            {
                Console.WriteLine("No Expenses Found");
            }
            else
            {
                for (int i = 0; i < Expenses.Count; i++)
                {
                    Expenses[i].DisplayExpense();
                }
            }
        }

        public void SummaryByCategory(string category)
        {
            if (category == "")
            {
                Console.WriteLine("Category Cannot Be Empty");
                return;
            }

            double total = 0;
            bool found = false;

            for (int i = 0; i < Expenses.Count; i++)
            {
                if (Expenses[i].Category == category)
                {
                    total = total + Expenses[i].Amount;
                    found = true;
                }
            }

            if (found == true)
                Console.WriteLine("Total For Category " + category + " = " + total);
            else
                Console.WriteLine("No Expenses Found For This Category");
        }

        public void SummaryByDate(string date)
        {
            if (date == "")
            {
                Console.WriteLine("Date Cannot Be Empty");
                return;
            }

            double total = 0;
            bool found = false;

            for (int i = 0; i < Expenses.Count; i++)
            {
                if (Expenses[i].Date == date)
                {
                    total = total + Expenses[i].Amount;
                    found = true;
                }
            }

            if (found == true)
                Console.WriteLine("Total For Date " + date + " = " + total);
            else
                Console.WriteLine("No Expenses Found For This Date");
        }
    }
}