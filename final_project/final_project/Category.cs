using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace final_project
{
    class Category
    {
        string food;
        string transport;
        string entertainment;

        public string Food
        {
            set
            {
                if (value != "")
                    food = value;
                else
                    food = "Food";
            }
            get
            {
                return food;
            }
        }

        public string Transport
        {
            set
            {
                if (value != "")
                    transport = value;
                else
                    transport = "Transport";
            }
            get
            {
                return transport;
            }
        }

        public string Entertainment
        {
            set
            {
                if (value != "")
                    entertainment = value;
                else
                    entertainment = "Entertainment";
            }
            get
            {
                return entertainment;
            }
        }

        public Category()
        {
            Food = "Food";
            Transport = "Transport";
            Entertainment = "Entertainment";
        }

        public virtual void DisplayCategories()
        {
            Console.WriteLine("Categories:");
            Console.WriteLine("1- " + Food);
            Console.WriteLine("2- " + Transport);
            Console.WriteLine("3- " + Entertainment);
        }

        public bool CheckCategory(string category)
        {
            if (category == Food || category == Transport || category == Entertainment)
                return true;
            else
                return false;
        }
    }
}
