using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace final_project
{

    
        abstract class Person
        {
            int id;
            string name;
            string email;

            public int ID
            {
                set
                {
                    if (value > 0)
                        id = value;
                    else
                        id = 0;
                }
                get
                {
                    return id;
                }
            }

            public string Name
            {
                set
                {
                    if (value != "")
                        name = value;
                    else
                        name = "No Name";
                }
                get
                {
                    return name;
                }
            }

            public string Email
            {
                set
                {
                    if (value.Contains("@"))
                        email = value;
                    else
                        email = "Invalid Email";
                }
                get
                {
                    return email;
                }
            }

            public Person()
            {
                ID = 1;
                Name = "Default Name";
                Email = "user@gmail.com";
            }

            public Person(int id, string name, string email)
            {
                ID = id;
                Name = name;
                Email = email;
            }

            public abstract void DisplayInfo();
        }
    }

