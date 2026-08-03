using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
namespace final_project
{
    

  
  
        class GenericStore<T>
        {
            List<T> items;

            public List<T> Items
            {
                set
                {
                    if (value != null)
                        items = value;
                    else
                        items = new List<T>();
                }
                get
                {
                    return items;
                }
            }

            public GenericStore()
            {
                Items = new List<T>();
            }

            public void Add(T item)
            {
                Items.Add(item);
            }

            public void Remove(T item)
            {
                Items.Remove(item);
            }

            public int Count()
            {
                return Items.Count;
            }
        }
    }

