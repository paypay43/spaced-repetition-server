const express = require('express');
const bodyParser = express.json();
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');

const languageRouter = express.Router();

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      );

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        });

      req.language = language;
      next();
    } catch (error) {
      next(error);
    }
  });

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      );

      res.json({
        language: req.language,
        words,
      });
      next();
    } catch (error) {
      next(error);
    }
  });

languageRouter
  .use(requireAuth)
  .get('/head', async (req, res, next) => {
    try {
      const nextWord = await LanguageService.getNextWord(
        req.app.get('db'),
        req.language.head
      );

      res.status(200).send({
        totalScore: req.language.total_score,
        ...nextWord
      });
      next();
    } catch (error) {
      next(error);
    }
  });

languageRouter
  .use(requireAuth)
  .post('/guess', bodyParser, async (req, res, next) => {
    const { guess } = req.body;
    if (!guess) {
      res.status(400).send({ error: "Missing 'guess' in request body"});
    }
    
    res.send('implement me!');
  });

module.exports = languageRouter;
