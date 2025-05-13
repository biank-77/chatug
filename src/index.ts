import app from './app';

const PORT = process.env.PORT || 3201;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});