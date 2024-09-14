import { useQuery, useMutation } from '@tanstack/react-query';
import { customTestAxios } from '../apis/customTestAxios';
import { useTestStore } from '../store/store';

export default function TestPage() {
    // const { isLoading, error, data, isFetching } = useQuery({
    //     queryKey: ['getPost'],
    //     queryFn: async () => {
    //         const response = await customTestAxios.get('posts/1');
    //         return response.data;
    //     },
    // });

    const { mutate, isLoading, isError, error, isSuccess, data } = useMutation({
        mutationFn: async () => {
            return await customTestAxios.delete('posts/1');
        },
    });

    const counter = useTestStore((state) => state.counter);
    const plusCounter = useTestStore((state) => state.plusCounter);
    const resetCounter = useTestStore((state) => state.resetCounter);

    return (
        <>
            {/* <h3>React Query - useQuery 테스트</h3>
            <h5>{!isLoading && data.title}</h5>
            <div>{!isLoading && data.content}</div> */}

            <h3>React Query - useMutation 테스트</h3>
            <button onClick={() => mutate()}>글 삭제</button>
            {isError && <div>삭제 실패 {error.message}</div>}
            {isSuccess && <div>삭제 성공 {data.data.title}</div>}

            <h3>Zustand 테스트</h3>
            <div>counter : {counter}</div>
            <button onClick={plusCounter}>더하기</button>
            <button onClick={resetCounter}>초기화</button>
        </>
    );
}
