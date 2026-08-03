using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace final_project
{
    class Program
    {
        static void Main(string[] args)
    {
        ExpenseManager manager = new ExpenseManager();
        FileHandler fileHandler = new FileHandler();
        Category category = new Category();

        Person user = new User(1, "Ahmed", "ahmed@gmail.com");

        int choice = -1;

        while (choice != 0)

        {
                
                try
            {
                Console.WriteLine("Expense Tracker System");
                Console.WriteLine("1- Add Expense");
                Console.WriteLine("2- Edit Expense");
                Console.WriteLine("3- Delete Expense");
                Console.WriteLine("4- View All Expenses");
                Console.WriteLine("5- Search Expense");
                Console.WriteLine("6- Summary By Category");
                Console.WriteLine("7- Summary By Date");
                Console.WriteLine("8- Save To File");
                Console.WriteLine("9- User Information");
                Console.WriteLine("0- Exit");

                Console.Write("Enter Choice: ");
                choice = Convert.ToInt32(Console.ReadLine());

                if (choice == 1)
                {
                    Console.Write("Enter Expense ID: ");
                    int id = Convert.ToInt32(Console.ReadLine());

                    Console.Write("Enter Amount: ");
                    double amount = Convert.ToDouble(Console.ReadLine());

                    while (amount <= 0)
                    {
                        Console.WriteLine("Amount Must Be Greater Than Zero");
                        Console.Write("Enter Amount Again: ");
                        amount = Convert.ToDouble(Console.ReadLine());
                    }

                    category.DisplayCategories();

                    Console.Write("Enter Category: ");
                    string cat = Console.ReadLine();

                    while (category.CheckCategory(cat) == false)
                    {
                        Console.WriteLine("Invalid Category");
                        Console.Write("Enter Category Again: ");
                        cat = Console.ReadLine();
                    }

                    Console.Write("Enter Description: ");
                    string desc = Console.ReadLine();

                    Console.Write("Enter Date: ");
                    string date = Console.ReadLine();

                    Expense expense = new Expense(id, amount, cat, desc, date);

                    manager.AddExpense(expense);
                }
                else if (choice == 2)
                {
                    Console.Write("Enter Expense ID To Edit: ");
                    int id = Convert.ToInt32(Console.ReadLine());

                    Console.Write("Enter New Amount: ");
                    double amount = Convert.ToDouble(Console.ReadLine());

                    while (amount <= 0)
                    {
                        Console.WriteLine("Amount Must Be Greater Than Zero");
                        Console.Write("Enter Amount Again: ");
                        amount = Convert.ToDouble(Console.ReadLine());
                    }

                    category.DisplayCategories();

                    Console.Write("Enter New Category: ");
                    string cat = Console.ReadLine();

                    while (category.CheckCategory(cat) == false)
                    {
                        Console.WriteLine("Invalid Category");
                        Console.Write("Enter Category Again: ");
                        cat = Console.ReadLine();
                    }

                    Console.Write("Enter New Description: ");
                    string desc = Console.ReadLine();

                    Console.Write("Enter New Date: ");
                    string date = Console.ReadLine();

                    manager.EditExpense(id, amount, cat, desc, date);
                }
                else if (choice == 3)
                {
                    Console.Write("Enter Expense ID To Delete: ");
                    int id = Convert.ToInt32(Console.ReadLine());

                    manager.DeleteExpense(id);
                }
                else if (choice == 4)
                {
                    manager.ViewAllExpenses();
                }
                else if (choice == 5)
                {
                    Console.Write("Enter Expense ID To Search: ");
                    int id = Convert.ToInt32(Console.ReadLine());

                    Expense expense = manager.SearchExpenseByID(id);

                    if (expense == null)
                        Console.WriteLine("Expense Not Found");
                    else
                        expense.DisplayExpense();
                }
                else if (choice == 6)
                {
                    Console.Write("Enter Category: ");
                    string cat = Console.ReadLine();

                    manager.SummaryByCategory(cat);
                }
                else if (choice == 7)
                {
                    Console.Write("Enter Date: ");
                    string date = Console.ReadLine();

                    manager.SummaryByDate(date);
                }
                else if (choice == 8)
                {
                    manager.ViewAllExpenses();
                    fileHandler.SaveToFile(manager.Expenses);
                }
                else if (choice == 9)
                {
                    
                
                
                
                    user.DisplayInfo();
                }
                else if (choice == 0)
                {
                    Console.WriteLine("Good Bye");
                }
                else
                {
                        Console.Clear();
                        Console.WriteLine("Invalid Choice");
                }
            }
            catch
            {
                    Console.Clear();
                Console.WriteLine("Invalid Input");

            }
                
            Console.WriteLine();
        }
    }
}
}
