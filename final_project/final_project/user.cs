using System;

namespace final_project
{
    class User : Person, IDisplayable
    {
        public int UserID
        {
            set
            {
                ID = value;
            }
            get
            {
                return ID;
            }
        }

        public User() : base()
        {
        }

        public User(int userID, string name, string email) : base(userID, name, email) 
        {
        }

        public void DisplayUser()
        {
            Display();
        }

        public override void DisplayInfo()
        {
            Display();
        }

        public void Display()
        {
            Console.WriteLine("User ID = " + UserID);
            Console.WriteLine("Name = " + Name);
            Console.WriteLine("Email = " + Email);
        }
    }
}