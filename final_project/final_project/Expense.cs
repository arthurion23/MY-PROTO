using System;

namespace final_project
{
    class Expense : Record, IDisplayable
    {
        double amount;
        string category;
        string description;
        string date;

        public int ExpenseID
        {
            set
            {
                if (value > 0)
                {
                    RecordID = value;
                }
                else
                {
                    RecordID = 0; 
                }
            }
            get
            {
                return RecordID;
            }
        }

        public double Amount
        {
            set
            {
                if (value > 0)
                    amount = value;
                else
                    amount = 0;
            }
            get
            {
                return amount;
            }
        }

        public string Category
        {
            set
            {
                if (value != "")
                    category = value;
                else
                    category = "Food";
            }
            get
            {
                return category;
            }
        }

        public string Description
        {
            set
            {
                if (value != "")
                    description = value;
                else
                    description = "No Description";
            }
            get
            {
                return description;
            }
        }

        public string Date
        {
            set
            {
                if (value != "")
                    date = value;
                else
                    date = "No Date";
            }
            get
            {
                return date;
            }
        }

        public Expense() 
        {
            ExpenseID = 1;
            Amount = 1;
            Category = "Food";
            Description = "No Description";
            Date = "No Date";
        }

        public Expense(int id, double expenseAmount, string expenseCategory, string expenseDescription, string expenseDate) : base(id)
        {
            ExpenseID = id;
            Amount = expenseAmount;
            Category = expenseCategory;
            Description = expenseDescription;
            Date = expenseDate;
        }

        public void DisplayExpense()
        {
            Display();
        }

        public override void DisplayRecord()
        {
            Display();
        }

        public void Display()
        {
            Console.WriteLine("Expense ID = " + ExpenseID);
            Console.WriteLine("Amount = " + Amount);
            Console.WriteLine("Category = " + Category);
            Console.WriteLine("Description = " + Description);
            Console.WriteLine("Date = " + Date);
            Console.WriteLine("-------------------------");
        }
    }
}