import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  //onDragEnd : 드래그를 끝낸 시점에 불려지는 함수
  const onDragEnd = ({ destination, source }: DropResult) => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
                  <Draggable key={index} draggableId={toDo} index={index}>
                    {(magic) => (
                      <Card
                        ref={magic.innerRef}
                        {...magic.dragHandleProps}
                        {...magic.draggableProps}
                      >
                        {toDo}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {/*magic.placeholder: 드래그 시 크기를 유지시켜주는 역할  */}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
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
