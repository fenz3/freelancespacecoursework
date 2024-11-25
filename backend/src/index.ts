import express from 'express';
import userRoutes from './modules/users/user.route';
import imageRoutes from './modules/images/image.route';
import serviceRoutes from './modules/services/service.route';
import categoryRoutes from './modules/categories/category.route';
import errorHandler from './libs/middleware/error.middleware';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use('/auth', userRoutes);

app.use('/images', imageRoutes);

app.use('/services', serviceRoutes);

app.use('/categories', categoryRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
