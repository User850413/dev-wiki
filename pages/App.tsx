import React from "react";

function App() {
  const onClickGet = async () => {
    try {
      const response = await fetch("/api/datas");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error("failed to fetch data", err);
    }
  };

  const onClickPost = async () => {
    const id = 5;
    try {
      const response = await fetch(`/api/datas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          isdone: false,
          content: "tv시청",
          type: "딱히",
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (err) {
      console.error("failed to fetch data", err);
    }
  };

  const onClickPut = async () => {
    try {
      const id = 1;
      const response = await fetch(`/api/datas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isdone: false }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("updated data : ", data);
    } catch (err) {
      console.error("failed to fetch data", err);
    }
  };

  const onClickDelete = async () => {
    try {
      const id = 5;
      const response = await fetch(`/api/datas/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (err) {
      console.error("failed to fetch data", err);
    }
  };

  return (
    <div className="App">
      <button onClick={onClickGet}>데이터 가져오기</button>
      <button onClick={onClickPost}>데이터 추가하기</button>
      <button onClick={onClickPut}>데이터 수정하기</button>
      <button onClick={onClickDelete}>데이터 삭제하기</button>
    </div>
  );
}

export default App;
