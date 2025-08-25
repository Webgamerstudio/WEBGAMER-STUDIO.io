# AR Store

A modern web-based application store for Augmented Reality (AR) apps with a complete developer dashboard, user profiles, and admin management system.

## 🚀 Features

### For Users
- **Browse AR Apps**: Discover amazing augmented reality applications
- **Search & Filter**: Find apps quickly with smart search functionality
- **User Profiles**: Create personalized profiles with achievements and statistics
- **Reviews & Ratings**: Rate and review apps, read others' opinions
- **Follow System**: Follow other users and developers
- **Download Tracking**: Track app downloads and popularity
- **Privacy Controls**: Public/private profile settings

### For Developers
- **Developer Dashboard**: Upload and manage your AR applications
- **App Management**: Edit, update, or delete your published apps
- **Analytics**: Track downloads, user engagement, and app performance
- **Multiple Hosting Options**: Support for GitHub, Dropbox, Firebase Storage, Google Drive
- **Link Testing**: Built-in tools to test download links before publishing
- **Real-time Status**: See approval status of your submitted apps

### For Admins
- **Admin Panel**: Comprehensive app review and management system
- **User Management**: Monitor user activities and profiles
- **Approval Workflow**: Review, approve, or reject submitted apps
- **Notification System**: Send feedback to developers
- **Statistics Dashboard**: Overview of platform metrics

## 🛠 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase Realtime Database
- **Authentication**: Firebase Authentication
- **Hosting**: Firebase Hosting (recommended)
- **Icons**: Font Awesome
- **Styling**: Custom CSS with modern design principles

## 📁 Project Structure

```
ar-store/
├── index.html              # Home page - app browsing
├── login.html              # User login page
├── signup.html             # User registration (Sign.html)
├── Profile.html            # User profile page
├── App_details.html        # Individual app details page
├── Uploader.html           # Developer dashboard
├── admin.html              # Admin management panel
├── firebase-config.js      # Firebase configuration
├── assets/                 # Images and other assets
└── README.md              # This file
```

## 🔧 Setup Instructions

### Prerequisites
- Firebase account
- Web browser with modern JavaScript support
- Basic understanding of Firebase console

### Firebase Setup

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup wizard
   - Enable Google Analytics (optional)

2. **Enable Authentication**:
   - Navigate to Authentication > Sign-in method
   - Enable "Email/Password" provider
   - Configure authorized domains if needed

3. **Setup Realtime Database**:
   - Go to Realtime Database
   - Create database in test mode initially
   - Set up security rules (see below)

4. **Get Firebase Config**:
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Click on Web app icon and register your app
   - Copy the Firebase configuration

### Database Structure

```json
{
  "apps": {
    "app_id": {
      "name": "App Name",
      "description": "App Description",
      "iconUrl": "https://example.com/icon.png",
      "link": "https://example.com/download",
      "screenshots": "url1,url2,url3",
      "uploadedBy": "Developer Name",
      "uploadedByUid": "user_uid",
      "status": "pending|approved|rejected",
      "createdAt": 1234567890,
      "downloadCount": 0,
      "version": "1.0",
      "platform": "github|dropbox|firebase|direct"
    }
  },
  "users": {
    "user_uid": {
      "username": "username",
      "email": "user@example.com",
      "bio": "User bio",
      "photoURL": "profile_picture_url",
      "isPublic": true,
      "createdAt": 1234567890
    }
  },
  "reviews": {
    "app_id": {
      "review_id": {
        "userId": "user_uid",
        "rating": 5,
        "text": "Review text",
        "timestamp": 1234567890
      }
    }
  },
  "followers": {
    "user_uid": {
      "follower_uid": true
    }
  },
  "following": {
    "user_uid": {
      "followed_uid": true
    }
  },
  "notifications": {
    "user_uid": {
      "notification_id": {
        "type": "approval|rejection|follow",
        "message": "Notification message",
        "timestamp": 1234567890,
        "read": false
      }
    }
  }
}
```

### Security Rules

Update your Firebase Realtime Database rules:

```json
{
  "rules": {
    "apps": {
      ".read": true,
      ".write": "auth != null",
      "$appId": {
        ".validate": "newData.hasChildren(['name', 'description', 'iconUrl', 'link', 'uploadedByUid', 'status'])",
        "uploadedByUid": {
          ".validate": "newData.val() == auth.uid"
        },
        "status": {
          ".write": "root.child('users').child(auth.uid).child('isAdmin').val() == true || (auth.uid == data.parent().child('uploadedByUid').val() && newData.val() != 'approved')"
        }
      }
    },
    "users": {
      ".read": true,
      "$uid": {
        ".write": "$uid === auth.uid || root.child('users').child(auth.uid).child('isAdmin').val() == true"
      }
    },
    "reviews": {
      ".read": true,
      "$appId": {
        "$reviewId": {
          ".write": "auth != null && (!data.exists() || data.child('userId').val() == auth.uid)"
        }
      }
    },
    "followers": {
      ".read": true,
      ".write": "auth != null"
    },
    "following": {
      ".read": true,
      ".write": "auth != null"
    },
    "notifications": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid || root.child('users').child(auth.uid).child('isAdmin').val() == true"
      }
    }
  }
}
```

### Configuration

1. **Update firebase-config.js**:
   ```javascript
   import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
   import { getAuth } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';

   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     databaseURL: "https://your-project-default-rtdb.firebaseio.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   ```

2. **Set Admin Users**:
   Update the `ADMIN_EMAILS` array in `admin.html`:
   ```javascript
   const ADMIN_EMAILS = ['admin@example.com', 'admin2@example.com'];
   ```

## 🚀 Deployment

### Firebase Hosting (Recommended)

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Project**:
   ```bash
   firebase init hosting
   ```

4. **Deploy**:
   ```bash
   firebase deploy
   ```

### Alternative Hosting

You can also deploy to:
- GitHub Pages
- Netlify
- Vercel
- Any web server that supports static files

## 📱 Supported Download Platforms

### For Developers

The platform supports multiple file hosting services:

1. **GitHub Releases** (Recommended):
   - Create a repository
   - Go to Releases → Create new release
   - Upload APK file
   - Copy download link

2. **Dropbox**:
   - Upload file
   - Get share link
   - Change `dl=0` to `dl=1`

3. **Firebase Storage**:
   - Upload to Firebase Storage
   - Copy download URL

4. **Google Drive**:
   - Upload file
   - Set sharing to "Anyone with link"
   - Use file ID for conversion

## 🎨 Customization

### Themes
Update CSS variables in each HTML file to customize colors:

```css
:root {
    --primary-color: #667eea;
    --primary-hover: #5a67d8;
    --text-dark: #2c3e50;
    --bg-light: #f8f9fa;
    /* Add more variables */
}
```

### Features
- Add new app categories
- Implement advanced search filters
- Add social sharing features
- Integrate payment systems for premium apps

## 🔐 Security Features

- **User Authentication**: Secure login/registration system
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Content sanitization
- **Database Rules**: Strict Firebase security rules
- **Admin Controls**: Restricted admin panel access

## 📊 Analytics

The platform includes built-in analytics:
- Download tracking
- User engagement metrics
- App popularity rankings
- Developer statistics

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Connection Error**:
   - Check firebase-config.js configuration
   - Verify Firebase project settings
   - Ensure database rules are correctly set

2. **Download Links Not Working**:
   - Use the built-in link tester
   - Verify file permissions
   - Check if hosting service allows direct downloads

3. **Admin Panel Access Denied**:
   - Add your email to ADMIN_EMAILS array
   - Clear browser cache and cookies
   - Check Firebase Authentication status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: webgamerconnect@gmail.com
- Documentation: [docs.arstore.example.com](https://docs.arstore.example.com)

## 🙏 Acknowledgments

- Firebase for backend services
- Font Awesome for icons
- Modern CSS techniques for responsive design
- Community feedback and contributions

---

**Built with ❤️ for the AR development community**