export const getRandomColor = () => {
    const colors = ['#FF66A8', '#FD9A6A', '#89B6FF', '#FFD86D'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};
