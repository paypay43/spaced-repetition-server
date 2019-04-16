const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first();
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id });
  },

  getNextWord(db, head) {
    return db
      .from('word')
      .select(
        'original',
        'correct_count',
        'incorrect_count'
      )
      .where('word.id', head)
      .then(word => {
        return {
          nextWord: word[0].original,
          wordCorrectCount: word[0].correct_count,
          wordIncorrectCount: word[0].incorrect_count
        };
      });
  },

  correctAnswer(db, head, answer) {
    return db
      .from('word')
      .select(
        'translation',
        'correct_count',
        'incorrect_count'
      )
      .where('word.id', head)
      .then(word => {
        if (word.translation !== answer) {
          return 'incorrect';
        }

      })
    
    

  }
};

module.exports = LanguageService;
