# O-K Kitchen Recipe System

מערכת ניהול מתכונים אישית בעברית. בנויה עם React + Vite, אתר סטטי מהיר ומותאם למובייל שמחליף פתקים באייפון בחוויית בישול אינטראקטיבית.

## תכונות

- 📖 **ספריית מתכונים**: דפדף בכל המתכונים עם חיפוש וסינון
- 🎯 **קטגוריות**: מתכונים מסודרים לפי קטגוריות (בשר, אפייה, פסטה וכו')
- 🔍 **חיפוש חכם**: מצא מתכונים לפי שם או מרכיבים
- 🏷️ **סינון תגיות**: סנן מתכונים לפי תגיות מרובות
- 🧮 **מחשבון מנות דינמי**: התאם מספר מנות וחשב מחדש את כמויות המרכיבים
- ✅ **מרכיבים אינטראקטיביים**: סמן מרכיבים כשאתה מוסיף אותם
- 📝 **הוראות שלב אחר שלב**: סמן שלבי הכנה כשהושלמו
- 👨‍🍳 **מצב בישול**: 
  - ממשק נקי מהסחות דעת עם גופנים גדולים יותר
  - ניגודיות גבוהה לקריאה קלה
  - Wake Lock API שומר על המסך דלוק במהלך הבישול
- 📱 **מותאם למובייל**: מעוצב לאייפון ומכשירים ניידים
- 🇮🇱 **תמיכה מלאה בעברית**: ממשק RTL ושפה עברית

## מבנה UX

### עמוד הבית (/)
- **אזור חיפוש**: שדה הקלדה, תגיות לבחירה מרובה, וכפתור "חפש מתכונים" בולט
- **אזור קטגוריות**: קארדים ברורים לכל קטגוריה (אפייה, בשר, סלטים וכו')
- **קישור לכל המתכונים**: גישה מהירה לכל רשימת המתכונים

### עמוד תוצאות (/results)
- מגיעים לכאן אחרי חיפוש או לחיצה על קטגוריה
- רשימת מתכונים עם קארדים (שם, זמן הכנה, קטגוריה)
- כפתור "חזור לחיפוש" בולט למעלה
- תצוגת הסינונים הפעילים

### עמוד מתכון (/recipe/:id)
- תצוגה מלאה של המתכון עם כל הפרטים
- מחשבון מנות אינטראקטיבי
- רשימת מצרכים ניתנת לסימון
- שלבי הכנה ניתנים לסימון
- מצב בישול מיוחד

## מבנה JSON

כל מתכון הוא קובץ JSON עם המבנה הבא:

```json
{
  "id": "recipe-name",
  "name": "שם המתכון",
  "category": "קטגוריה",
  "baseServings": 4,
  "prepTimeMinutes": 30,
  "tags": ["tag1", "tag2"],
  "ingredients": [
    { "amount": 1, "unit": "כוס", "name": "מרכיב" }
  ],
  "stages": [
    "שלב ראשון...",
    "שלב שני..."
  ]
}
```

**הבדל בין Category ל-Tags:**
- `category`: שדה יחיד (String) - הקטגוריה העיקרית של המתכון
- `tags`: מערך (Array) - תגיות מרובות לחיפוש וסינון

## Tech Stack

- **Frontend**: React 18 + Vite 5
- **Routing**: React Router 6
- **Data**: Static JSON files (no database)
- **Language**: Hebrew (RTL support)
- **Hosting**: Vercel or Netlify (free tier)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Adding Recipes

Add new recipe JSON files to `src/data/recipes/` following this schema:

```json
{
  "id": "recipe-name-in-english",
  "name": "Recipe Name",
  "baseServings": 4,
  "prepTimeMinutes": 30,
  "tags": ["tag1", "tag2"],
  "ingredients": [
    { "amount": 1, "unit": "cup", "name": "Ingredient Name" }
  ],
  "stages": [
    "First step of preparation...",
    "Second step..."
  ]
}
```

The app will automatically detect and load new recipes at build time.

## Deployment

### Deploy to Vercel

1. Push your code to a GitHub repository (can be private)
2. Import the project in Vercel
3. Vercel will auto-detect Vite and deploy

### Deploy to Netlify

1. Push your code to a GitHub repository (can be private)
2. Import the project in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

## Project Structure

```
recipes/
├── src/
│   ├── components/         # React components
│   │   ├── IngredientList.jsx
│   │   ├── PreparationSteps.jsx
│   │   └── ServingsControl.jsx
│   ├── pages/             # Page components
│   │   ├── HomePage.jsx
│   │   └── RecipePage.jsx
│   ├── data/              # Recipe data
│   │   └── recipes/       # JSON recipe files
│   ├── hooks/             # Custom React hooks
│   │   ├── useWakeLock.js
│   │   └── useRecipeScaling.js
│   ├── utils/             # Utility functions
│   │   ├── recipeLoader.js
│   │   └── servingsCalculator.js
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Features in Detail

### Wake Lock API

The cooking mode uses the Screen Wake Lock API to keep your device screen on while cooking. This works on:
- Chrome/Edge 84+
- Safari 16.4+
- Firefox (behind flag)

For unsupported browsers, the app displays a reminder to keep the screen active.

### Servings Calculator

Automatically scales all ingredient amounts when you adjust servings. Supports:
- Decimal amounts
- Common fractions (¼, ½, ¾, ⅓, ⅔)
- Various units (cups, tsp, tbsp, g, kg, etc.)

## License

Private use only.

## Author

O-K (Omer Kuleski)

