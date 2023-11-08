/**
 * @swagger
* components:
 *  schemas:
 *    Movie:
 *      type: object
 *      required:
 *        - country
 *        - director
 *        - duration
 *        - year
 *        - description
 *        - image
 *        - trailerLink
 *        - thumbnail
 *        - owner
 *        - movieId
 *        - nameRU
 *        - nameEN
 *      properties:
 *        _id:
 *          type: string
 *        country:
 *          type: string
 *        director:
 *          type: string
 *        duration:
 *          type: number
 *        year:
 *          type: string
 *        description:
 *          type: string
 *        image:
 *          type: string
 *        trailerLink:
 *          type: string
 *        thumbnail:
 *          type: string
 *        owner:
 *          type: mongoose.Schema.Types.ObjectId
 *        movieId:
 *          type: number
 *        nameRU:
 *          type: string
 *        nameEN:
 *          type: string
 *      example:
 *          country: 'Франция'
 *          director: 'Мари Лозье'
 *          duration: 16
 *          year: '2014'
 *          description: 'В конце 1960-х группа «Роллинг Стоунз», несмотря на все свои мегахиты'
 *          image: 'https://api.nomoreparties.co/uploads/a048f25d_cc42_4c2c_aa8d_5878118806d7_ffd3e73bf8.jpeg'
 *          trailerLink: 'https://www.youtube.com/watch?v=xFbHDF30-lQ'
 *          thumbnail: 'https://api.nomoreparties.co/uploads/a048f25d_cc42_4c2c_aa8d_5878118806d7_ffd3e73bf8.jpeg'
 *          owner:
 *             id: 651463446f6a393ae3181132
 *          movieId: 66
 *          nameRU: 'Алан Вега. Миллион мечтаний'
 *          nameEN: 'Alan Vega, Just a Million Dreams'
*/
/**
 * @swagger
 * tags:
 *  name: Movie
 *  description: API управления фильмами
 * /movies:
 *  get:
 *   summary: Вывод всех фильмов
 *   tags: [Movie]
 *   responses:
 *    200:
 *     description: Все фильмы
 *     content:
 *      application/json:
 *         type: object
 *         items:
 *          $ref: '#/components/schemas/Movie'
 *    400:
 *     description: Bad request
 *    401:
 *     description: Unauthorized
 *    500:
 *     description: Server error
 *  post:
 *   summary: Создание фильма
 *   tags: [Movie]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Movie'
 *   responses:
 *    201:
 *     description: Созданный фильм
 *     content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Movie'
 *    500:
 *     description: Server error
 * /books/{id}:
 *  delete:
 *   summary: Удаление фильма
 *   tags: [Movie]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: Идентификатор книги
 *   responses:
 *    404:
 *     description: Фильм с таким id не найден
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Movie'
 *    403:
 *     description: Доступ к запрашиваемой странице запрещен
 *    200:
 *     description: Фильм успешно удален'
 *
 */

const router = require('express').Router();
const { validationCreateMovie, validationMovieById } = require('../middlewares/validation');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies-conroller');

// Получить данные о всех карточках
router.get('/', getMovies);
// Добавление данных
router.post('/', validationCreateMovie, createMovie);
// Удаление данных
router.delete('/:movieId', validationMovieById, deleteMovie);

module.exports = router;
