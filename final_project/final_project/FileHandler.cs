using System;
using System.Collections.Generic;
using System.IO;


namespace final_project
{
    class FileHandler
    {
        public FileHandler()
        {
        }

        public void SaveToFile(List<Expense> expenses)
        {
            try
            {
                StreamWriter writer = new StreamWriter("expenses.txt");

                for (int i = 0; i < expenses.Count; i++)
                {
                    writer.WriteLine(
                        expenses[i].ExpenseID + "|" +
                        expenses[i].Amount + "|" +
                        expenses[i].Category + "|" +
                        expenses[i].Description + "|" +
                        expenses[i].Date
                    );
                }

                writer.Close();

                Console.WriteLine("Data Saved Successfully");
            }
            catch
            {
                Console.WriteLine("File Error While Saving");
            }
        }


    }
}