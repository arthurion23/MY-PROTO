using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace final_project
{
   
    
        abstract class Record
        {
            int recordID;

            public int RecordID
            {
                set
                {
                    if (value > 0)
                        recordID = value;
                    else
                        recordID = 0;
                }
                get
                {
                    return recordID;
                }
            }

            public Record()
            {
                RecordID = 1;
            }

            public Record(int id)
            {
                RecordID = id;
            }

            public abstract void DisplayRecord();
        }
    }

