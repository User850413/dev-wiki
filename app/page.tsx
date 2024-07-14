"use client";

import React from "react";

function Homepage() {
  const onClickGet = async () => {};

  const onClickPost = async () => {};

  const onClickPut = async () => {};

  const onClickDelete = async () => {};

  return (
    <div className="App">
      <button onClick={onClickGet}>데이터 가져오기</button>
      <button onClick={onClickPost}>데이터 추가하기</button>
      <button onClick={onClickPut}>데이터 수정하기</button>
      <button onClick={onClickDelete}>데이터 삭제하기</button>
    </div>
  );
}

export default Homepage;
