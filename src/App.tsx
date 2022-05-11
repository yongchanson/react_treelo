import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  //onDragEnd : 드래그를 끝낸 시점에 불려지는 함수
  const onDragEnd = (info: DropResult) => {
    // console.log(info);
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          //...allBoards : 드래그 했을때, 3가지 배열을 모두 가져옴
          //단 바뀐배열은 새로운 배열을 가져옴
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

// import React from "react";
// import { useRecoilState } from "recoil";
// import { hourSelector, minuteState } from "./atoms";

// function App() {
//   //useRecoilState는 atom, selector 둘다 사용가능
//   //[]의 첫번째 요소는 atom의 값 or selector의 get함수의 값
//   //[]의 두번째 요소는 atom을 수정하는 함수 or selector의 set property를 실행시키는 함수
//   const [minutes, setMinutes] = useRecoilState(minuteState);
//   const [hours, setHours] = useRecoilState(hourSelector);
//   const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
//     //+는 string->number 해줌
//     setMinutes(+event.currentTarget.value);
//   };
//   const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
//     setHours(+event.currentTarget.value);
//   };
//   return (
//     <div>
//       {/* onChange 함수가 있어야 수정가능함 */}
//       <input
//         value={minutes}
//         onChange={onMinutesChange}
//         type="number"
//         placeholder="Minutes"
//       />
//       <input
//         onChange={onHoursChange}
//         value={hours}
//         type="number"
//         placeholder="Hours"
//       />
//     </div>
//   );
// }

export default App;
