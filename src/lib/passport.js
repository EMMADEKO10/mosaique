import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './models/user.model.js'; // Assurez-vous d'avoir un modèle User approprié
import 'dotenv/config';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback', // Adapter l'URL de callback selon votre application
    scope: ['profile', 'email']  // Ajoutez ceci si ce n'est pas déjà fait
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Vérifier si l'e-mail existe déjà dans la base de données
      let user = await User.findOne({ email: profile.emails[0].value });

      if (!user) {
        // Si l'e-mail n'existe pas dans la base de données, le compte n'existe pas
        return done(null, false, { message: 'Ce compte Google n\'existe pas dans notre système.' });
      }

      // L'utilisateur existe dans la base de données
      return done(null, user);
    } catch (err) {
      console.error('Erreur lors de l\'authentification avec Google:', err);
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

export default passport;
