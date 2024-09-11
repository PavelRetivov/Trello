import api from '../../../../../api/request';

interface PositionBoard {
  idBoard: string;
  data: { id: number; position: number }[];
}

const UpdatePositionBoard = async ({ idBoard, data }: PositionBoard): Promise<void> => {
  console.log(data);
  try {
    const url = `/board/${idBoard}/list`;
    console.log(url);
    const request = await api.put(url, data);
    console.log(request);
  } catch (error) {
    console.log(error);
  }
};
export default UpdatePositionBoard;
