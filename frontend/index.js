// Helper function to create elements
function createElement(type, props, ...children) {
    const element = document.createElement(type);

    if (props) {
        for (const key in props) {
            if (key === 'style') {
                for (const styleKey in props.style) {
                    element.style[styleKey] = props.style[styleKey];
                }
            } else if (key.startsWith('on')) {
                // Event listeners
                const eventName = key.substring(2).toLowerCase();
                element.addEventListener(eventName, props[key]);
            } else {
                element[key] = props[key];
            }
        }
    }

    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child) {
            element.appendChild(child);
        }
    });

    return element;
}

// --- Components ---

// Navbar Component
function Navbar() {
    return createElement('div', { className: 'navbar glassmorphism' },
        createElement('div', { className: 'navbar-left' },
            createElement('img', { src: '', alt: 'Netflix Logo', className: 'logo' }),
            createElement('a', { href: '#', className: 'active' }, 'Home'),
            createElement('a', { href: '#' }, 'TV Shows'),
            createElement('a', { href: '#' }, 'Movies'),
            createElement('a', { href: '#' }, 'New & Popular'),
            createElement('a', { href: '#' }, 'My List')
        ),
        createElement('div', { className: 'navbar-right' },
            createElement('a', { href: '#' }, 'Search'),
            createElement('a', { href: '#' }, 'Kids'),
            createElement('a', { href: '#' }, 'Profile')
        )
    );
}

// Hero Section Component
function HeroSection() {
    return createElement('div', { className: 'hero' },
        createElement('img', { src: 'https://unsplash.com/photos/a-group-of-people-sitting-in-front-of-a-tv-screen-mG28olYFgHI', alt: 'Hero Background', className: 'hero-background' }),
        createElement('div', { className: 'hero-overlay' }),
        createElement('div', { className: 'hero-content' },
            createElement('h1', null, 'Unlimited movies, TV shows, and more.'),
            createElement('p', null, 'Watch anywhere. Cancel anytime.'),
            createElement('a', { href: '/signup', className: 'btn btn-red' }, 'Get Started'),
            createElement('a', { href: '/login', className: 'sign-in-link' }, 'Sign In')
        )
    );
}

// Feature Section Component
function FeatureSection({ title, description, imageSrc }) {
    return createElement('div', { className: 'feature-section' },
        createElement('h2', null, title),
        createElement('p', null, description),
        createElement('img', { src: imageSrc, alt: title })
    );
}

// Footer Component
function Footer() {
    return createElement('footer', null,
        createElement('a', { href: '#' }, 'FAQ'),
        createElement('a', { href: '#' }, 'Help Center'),
        createElement('a', { href: '#' }, 'Terms of Use'),
        createElement('a', { href: '#' }, 'Privacy'),
        createElement('a', { href: '#' }, 'Cookie Preferences'),
        createElement('a', { href: '#' }, 'Corporate Information'),
        createElement('p', null, '© 2023 Netflix Clone')
    );
}

// Content Row Component
function ContentRow({ title, posters }) {
  return createElement('div', { className: 'content-row' },
    createElement('h2', null, title),
    ...posters.map(poster =>
      createElement('div', { className: 'poster', key: poster.src },
        createElement('img', { src: poster.src, alt: poster.alt }),
        createElement('div', { className: 'poster-overlay' },
          createElement('span', null, poster.title),
          createElement('a', { href: '#', className: 'btn btn-red' }, 'Play'),
          createElement('button', { className: 'btn btn-gray' }, '+ My List'),
          createElement('a', { href: `/title/${poster.id}`, className: 'btn btn-gray' }, 'More Info') // Link to details
        )
      )
    )
  );
}


// --- Pages ---

// Landing Page
function LandingPage() {
    return createElement('div', null,
        HeroSection(),
        FeatureSection({ title: 'Watch on any device', description: 'Stream on your phone, tablet, laptop, and TV.', imageSrc: '' }),
        FeatureSection({ title: 'Download and go', description: 'Save your favorites easily and always have something to watch.', imageSrc: '' }),
        FeatureSection({ title: 'Create profiles for kids', description: 'Send kids on adventures with their favorite characters in a space made just for them—free with your membership.', imageSrc: '' }),
        Footer()
    );
}

// Login Page
function LoginPage() {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login logic here (e.g., send data to server)
        console.log('Login submitted');
    };

    return createElement('div', { className: 'form-container glassmorphism' },
        createElement('h2', null, 'Sign In'),
        createElement('form', { onSubmit: handleSubmit },
            createElement('div', { className: 'form-group' },
                createElement('label', { htmlFor: 'email' }, 'Email or Phone Number'),
                createElement('input', { type: 'text', id: 'email', placeholder: 'Enter your email or phone number' })
            ),
            createElement('div', { className: 'form-group' },
                createElement('label', { htmlFor: 'password' }, 'Password'),
                createElement('input', { type: 'password', id: 'password', placeholder: 'Enter your password' })
            ),
            createElement('button', { type: 'submit', className: 'btn btn-red' }, 'Sign In'),
            createElement('a', { href: '#', style: { display: 'block', marginTop: '10px', color: '#E5E5E5' } }, 'Need Help?'),
            createElement('a', { href: '/signup', style: { display: 'block', marginTop: '10px', color: '#E5E5E5' } }, 'New to Netflix? Sign up now.')
        )
    );
}


// Signup Page
function SignupPage(){
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Sign up submitted");
    }

    return createElement('div', {className: 'form-container glassmorphism'}, 
        createElement('h2', null, 'Sign Up'),
        createElement('form', {onSubmit: handleSubmit},
            createElement('div', {className: 'form-group'},
                createElement('label', {htmlFor: 'email'}, 'Email'),
                createElement('input', {type: 'email', id: 'email', placeholder: 'Enter your email'})
            ),
            createElement('div', {className: 'form-group'},
                createElement('label', {htmlFor: 'password'}, 'Password'),
                createElement('input', {type: 'password', id: 'password', placeholder: 'Create a password'})
            ),
             createElement('button', { type: 'submit', className: 'btn btn-red' }, 'Sign Up'),
            createElement('a', { href: '/login', style: { display: 'block', marginTop: '10px', color: '#E5E5E5' } }, 'Already have an account? Sign in.')

        )
    );
}



// Browse Page
function BrowsePage() {
  const posters = [
    { id: 1, src: 'https://www.pexels.com/photo/grayscale-photo-of-man-wearing-sunglasses-158648/', alt: 'Poster 1', title: 'Movie 1' },
    { id: 2, src: 'https://unsplash.com/photos/a-close-up-of-a-movie-poster-with-a-woman-s-face-on-it-g_B_hVfEDdY', alt: 'Poster 2', title: 'Movie 2' },
    { id: 3, src: 'https://www.pexels.com/photo/photo-of-man-holding-remote-1040159/', alt: 'Poster 3', title: 'Movie 3' },
    { id: 4, src: 'https://unsplash.com/photos/a-movie-poster-for-the-movie-the-hobbit-the-desolation-of-smaug-h-Z-l-t-k-s', alt: 'Poster 4', title: 'Movie 4' },
     { id: 5, src: 'https://www.pexels.com/photo/grayscale-photo-of-man-wearing-sunglasses-158648/', alt: 'Poster 1', title: 'Movie 5' },
    { id: 6, src: 'https://unsplash.com/photos/a-close-up-of-a-movie-poster-with-a-woman-s-face-on-it-g_B_hVfEDdY', alt: 'Poster 2', title: 'Movie 6' },
    { id: 7, src: 'https://www.pexels.com/photo/photo-of-man-holding-remote-1040159/', alt: 'Poster 3', title: 'Movie 7' },
    { id: 8, src: 'https://unsplash.com/photos/a-movie-poster-for-the-movie-the-hobbit-the-desolation-of-smaug-h-Z-l-t-k-s', alt: 'Poster 4', title: 'Movie 8' },
  ];

    const carouselItems = [
    { src: 'https://www.pexels.com/photo/people-watching-movie-in-the-cinema-7991579/', alt: 'Featured 1' },
    { src: 'https://unsplash.com/photos/man-in-black-shirt-and-black-pants-sitting-on-black-couch-pElSkGRA2NU', alt: 'Featured 2' },
    { src: 'https://www.pexels.com/photo/tv-with-flat-screen-turned-on-near-wall-277574/', alt: 'Featured 3' },
  ];


  return createElement('div', null,
    Navbar(),
    Carousel({items: carouselItems}),
    ContentRow({ title: 'Trending Now', posters: posters }),
    ContentRow({ title: 'My List', posters: posters }),
    ContentRow({ title: 'Continue Watching', posters: posters }),
    ContentRow({ title: 'Popular on Netflix', posters: posters }),
    Footer()
  );
}

// Title Details Page
function TitleDetailsPage({ titleId }) {
  // In a real app, you'd fetch data based on titleId
  const titleData = {
    id: titleId,
    title: 'Sample Movie Title',
    backdrop: 'https://unsplash.com/photos/a-movie-poster-for-the-movie-the-hobbit-the-desolation-of-smaug-h-Z-l-t-k-s',
    year: 2023,
    rating: 'PG-13',
    duration: '2h 30min',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    synopsis: 'This is a sample synopsis for the movie.  It should be a brief overview of the plot.',
  };

  return createElement('div', null,
    Navbar(),
    createElement('img', { src: titleData.backdrop, alt: titleData.title, className: 'backdrop-image' }),
     createElement('div', {className: 'backdrop-overlay'}),
    createElement('div', { className: 'title-details' },
      createElement('h1', null, titleData.title),
      createElement('div', { className: 'title-info' },
        `${titleData.year} | ${titleData.rating} | ${titleData.duration} | ${titleData.genres.join(', ')}`
      ),
      createElement('p', null, titleData.synopsis),
      createElement('button', {className: 'btn btn-red'}, 'Play'),
      createElement('button', {className: 'btn btn-gray'}, '+ My List')
    ),
    Footer()
  );
}


//Carousel
function Carousel({ items }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

   const goToPrev = () => {
        setCurrentIndex(prevIndex => {
            if (prevIndex === 0) {
                return items.length - 1;
            }
            return prevIndex - 1;
        });
    };


  return createElement('div', { className: 'carousel' },
    createElement('div', { className: 'carousel-inner', style: { transform: `translateX(-${currentIndex * 100}%)` } },
      items.map((item, index) => (
        createElement('div', { key: index, className: 'carousel-item' },
          createElement('img', { src: item.src, alt: item.alt })
        )
      ))
    ),
     createElement('button', { onClick: goToPrev, style: { position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' } }, '<'),
    createElement('button', { onClick: goToNext, style: { position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' } }, '>'),

  );
}



// --- Routing (Simplified) ---

function App() {
    const currentPath = window.location.pathname;

    switch (currentPath) {
        case '/':
            return LandingPage();
        case '/login':
            return LoginPage();
        case '/signup':
            return SignupPage();
        case '/browse':
            return BrowsePage();
        case '/title/1':
            return TitleDetailsPage({titleId: 1});
        case '/title/2':
            return TitleDetailsPage({titleId: 2});
        case '/title/3':
            return TitleDetailsPage({titleId: 3});
        case '/title/4':
            return TitleDetailsPage({titleId: 4});
        default:
            return createElement('h1', null, '404 Not Found');
    }
}

// --- Render ---
const root = document.getElementById('root');
ReactDOM.render(React.createElement(App), root);
