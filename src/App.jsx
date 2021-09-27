import React, { useState, useEffect } from "react";

const getItem = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  }
};
function App() {
  const [litem, ladd] = useState("");
  const [fitem, fadd] = useState(getItem());
  const [submitBtn, setsubmitBtn] = useState(true);
  const [fedit, setfedit] = useState(null);

  const setEvent = (event) => {
    ladd(event.target.value);
  };
  const addItem = () => {
    if (!litem) {
      alert("Please fill data");
    } else if (litem && !submitBtn) {
      fadd(
        fitem.map((element) => {
          if (element.id === fedit) {
            return { ...element, name: litem };
          }
          return element;
        })
      );
      setsubmitBtn(true);
      ladd("");
      setfedit(null);
    } else {
      const allItem = { id: new Date().getTime().toString(), name: litem };
      fadd([...fitem, allItem]);
      ladd("");
    }
  };
  const deletes = (id) => {
    const afterdelete = fitem.filter((elem) => {
      return elem.id !== id;
    });

    fadd(afterdelete);
  };
  const editItem = (id) => {
    const editval = fitem.find((elem) => {
      return elem.id === id;
    });

    setsubmitBtn(false);
    ladd(editval.name);
    setfedit(id);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(fitem));
  }, [fitem]);
  return (
    <>
      <div className="main-div">
        <div className="center-div">
          <br />
          <h1>To Do List</h1>
          <br />
          <div className="cont">
            <input
              type="text"
              onChange={setEvent}
              placeholder="Add a Item"
              value={litem}
            />
            {submitBtn ? (
              <i
                className="fa fa-plus"
                aria-hidden="true"
                title="add"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="fa fa-edit"
                aria-hidden="true"
                title="edit"
                onClick={addItem}
              ></i>
            )}
          </div>
          <ol>
            {fitem.map((itemval) => {
              return (
                <div className="todo-style" key={itemval.id}>
                  <i
                    className="fa fa-edit"
                    aria-hidden="true"
                    title="edit"
                    onClick={() => editItem(itemval.id)}
                  ></i>
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    title="delete"
                    onClick={() => deletes(itemval.id)}
                  ></i>
                  <li>{itemval.name}</li>
                </div>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
}

export default App;
