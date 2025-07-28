import { Textbook, ReadingProgress } from '@/types/textbook';

export const dummyTextbooks: Textbook[] = [
  {
    metadata: {
      id: 'physics-101',
      title: 'Introduction to Physics: Mechanics and Thermodynamics',
      author: 'Dr. Sarah Williams',
      publisher: 'Academic Press',
      publicationYear: 2023,
      isbn: '978-0-123456-78-9',
      edition: '4th Edition',
      subject: 'Physics',
      category: 'Science',
      description: 'A comprehensive introduction to classical mechanics and thermodynamics for undergraduate students.',
      coverImage: '/covers/physics-101.jpg',
      totalPages: 350,
      language: 'English'
    },
    chapters: [
      {
        id: 'ch1',
        title: 'Introduction to Motion',
        startPage: 1,
        endPage: 45,
        sections: [
          { id: 's1-1', title: 'Kinematics', startPage: 1, endPage: 20 },
          { id: 's1-2', title: 'Dynamics', startPage: 21, endPage: 35 },
          { id: 's1-3', title: 'Problem Solving', startPage: 36, endPage: 45 }
        ]
      },
      {
        id: 'ch2',
        title: 'Forces and Newton\'s Laws',
        startPage: 46,
        endPage: 95,
        sections: [
          { id: 's2-1', title: 'Newton\'s First Law', startPage: 46, endPage: 60 },
          { id: 's2-2', title: 'Newton\'s Second Law', startPage: 61, endPage: 80 },
          { id: 's2-3', title: 'Newton\'s Third Law', startPage: 81, endPage: 95 }
        ]
      },
      {
        id: 'ch3',
        title: 'Energy and Work',
        startPage: 96,
        endPage: 150,
        sections: [
          { id: 's3-1', title: 'Work and Kinetic Energy', startPage: 96, endPage: 120 },
          { id: 's3-2', title: 'Potential Energy', startPage: 121, endPage: 140 },
          { id: 's3-3', title: 'Conservation of Energy', startPage: 141, endPage: 150 }
        ]
      }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterId: 'ch1',
        sectionId: 's1-1',
        content: `<h1>Chapter 1: Introduction to Motion</h1>
        <h2>1.1 Kinematics</h2>
        <p>Kinematics is the branch of mechanics that describes the motion of objects without considering the forces that cause the motion. In this section, we will explore the fundamental concepts of position, velocity, and acceleration.</p>
        
        <h3>Position and Displacement</h3>
        <p>Position refers to the location of an object in space relative to a reference point. We typically use coordinate systems to describe position mathematically. The displacement of an object is the change in its position.</p>
        
        <p>If an object moves from position x₁ to position x₂, its displacement Δx is:</p>
        <p><strong>Δx = x₂ - x₁</strong></p>
        
        <h3>Velocity</h3>
        <p>Velocity is the rate of change of position with respect to time. The average velocity of an object during a time interval Δt is:</p>
        <p><strong>v̄ = Δx / Δt</strong></p>
        
        <p>The instantaneous velocity is the limit of the average velocity as the time interval approaches zero:</p>
        <p><strong>v = dx/dt</strong></p>`
      },
      {
        pageNumber: 2,
        chapterId: 'ch1',
        sectionId: 's1-1',
        content: `<h3>Acceleration</h3>
        <p>Acceleration is the rate of change of velocity with respect to time. Like velocity, we can define both average and instantaneous acceleration.</p>
        
        <p>The average acceleration during a time interval Δt is:</p>
        <p><strong>ā = Δv / Δt</strong></p>
        
        <p>The instantaneous acceleration is:</p>
        <p><strong>a = dv/dt = d²x/dt²</strong></p>
        
        <h3>Motion with Constant Acceleration</h3>
        <p>When an object undergoes constant acceleration, we can derive several useful kinematic equations. These equations relate position, velocity, acceleration, and time:</p>
        
        <ol>
          <li><strong>v = v₀ + at</strong></li>
          <li><strong>x = x₀ + v₀t + ½at²</strong></li>
          <li><strong>v² = v₀² + 2a(x - x₀)</strong></li>
        </ol>
        
        <p>Where:</p>
        <ul>
          <li>v₀ is the initial velocity</li>
          <li>x₀ is the initial position</li>
          <li>a is the acceleration (constant)</li>
          <li>t is time</li>
        </ul>`
      },
      {
        pageNumber: 46,
        chapterId: 'ch2',
        sectionId: 's2-1',
        content: `<h1>Chapter 2: Forces and Newton's Laws</h1>
        <h2>2.1 Newton's First Law</h2>
        <p>Newton's First Law of Motion, also known as the Law of Inertia, states that an object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction, unless acted upon by an unbalanced force.</p>
        
        <h3>Understanding Inertia</h3>
        <p>Inertia is the tendency of an object to resist changes in its state of motion. The more massive an object is, the greater its inertia. This is why it's harder to push a heavy car than a light bicycle.</p>
        
        <h3>Balanced vs. Unbalanced Forces</h3>
        <p>When multiple forces act on an object, we must consider their vector sum, called the net force or resultant force. If the net force is zero, the forces are balanced, and the object's motion remains unchanged.</p>
        
        <p><strong>ΣF = 0</strong> (for balanced forces)</p>
        
        <p>When the net force is not zero, the forces are unbalanced, and the object's motion will change according to Newton's Second Law.</p>`
      }
    ]
  },
  {
    metadata: {
      id: 'calc-advanced',
      title: 'Advanced Calculus: Theory and Applications',
      author: 'Prof. Michael Chen',
      publisher: 'Mathematical Sciences Press',
      publicationYear: 2022,
      isbn: '978-1-987654-32-1',
      edition: '3rd Edition',
      subject: 'Mathematics',
      category: 'Mathematics',
      description: 'An advanced treatment of calculus covering multivariable calculus, vector analysis, and differential equations.',
      coverImage: '/covers/calculus-advanced.jpg',
      totalPages: 512,
      language: 'English'
    },
    chapters: [
      {
        id: 'calc-ch1',
        title: 'Multivariable Functions',
        startPage: 1,
        endPage: 85,
        sections: [
          { id: 'calc-s1-1', title: 'Functions of Several Variables', startPage: 1, endPage: 30 },
          { id: 'calc-s1-2', title: 'Limits and Continuity', startPage: 31, endPage: 55 },
          { id: 'calc-s1-3', title: 'Partial Derivatives', startPage: 56, endPage: 85 }
        ]
      },
      {
        id: 'calc-ch2',
        title: 'Vector Calculus',
        startPage: 86,
        endPage: 180,
        sections: [
          { id: 'calc-s2-1', title: 'Vector Fields', startPage: 86, endPage: 120 },
          { id: 'calc-s2-2', title: 'Line Integrals', startPage: 121, endPage: 150 },
          { id: 'calc-s2-3', title: 'Surface Integrals', startPage: 151, endPage: 180 }
        ]
      }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterId: 'calc-ch1',
        sectionId: 'calc-s1-1',
        content: `<h1>Chapter 1: Multivariable Functions</h1>
        <h2>1.1 Functions of Several Variables</h2>
        <p>In single-variable calculus, we studied functions of the form y = f(x), where the output depends on a single input variable. In multivariable calculus, we extend this concept to functions that depend on two or more input variables.</p>
        
        <h3>Definition</h3>
        <p>A function of two variables is a rule that assigns to each ordered pair (x, y) in a domain D a unique real number z. We write:</p>
        <p><strong>z = f(x, y)</strong></p>
        
        <p>Similarly, a function of three variables assigns to each ordered triple (x, y, z) in a domain D a unique real number w:</p>
        <p><strong>w = f(x, y, z)</strong></p>
        
        <h3>Examples</h3>
        <p>Consider the function f(x, y) = x² + y² - 4. This function takes two inputs and produces one output. For instance:</p>
        <ul>
          <li>f(1, 2) = 1² + 2² - 4 = 1 + 4 - 4 = 1</li>
          <li>f(0, 0) = 0² + 0² - 4 = -4</li>
          <li>f(2, 0) = 2² + 0² - 4 = 0</li>
        </ul>`
      }
    ]
  },
  {
    metadata: {
      id: 'bio-molecular',
      title: 'Molecular Biology: From Genes to Proteins',
      author: 'Dr. Emma Rodriguez',
      publisher: 'Life Sciences Publications',
      publicationYear: 2023,
      isbn: '978-2-345678-90-1',
      edition: '5th Edition',
      subject: 'Biology',
      category: 'Life Sciences',
      description: 'A comprehensive guide to molecular biology covering DNA, RNA, protein synthesis, and gene regulation.',
      coverImage: '/covers/molecular-biology.jpg',
      totalPages: 428,
      language: 'English'
    },
    chapters: [
      {
        id: 'bio-ch1',
        title: 'DNA Structure and Replication',
        startPage: 1,
        endPage: 75,
        sections: [
          { id: 'bio-s1-1', title: 'DNA Double Helix', startPage: 1, endPage: 25 },
          { id: 'bio-s1-2', title: 'DNA Replication Mechanism', startPage: 26, endPage: 50 },
          { id: 'bio-s1-3', title: 'Proofreading and Repair', startPage: 51, endPage: 75 }
        ]
      }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterId: 'bio-ch1',
        sectionId: 'bio-s1-1',
        content: `<h1>Chapter 1: DNA Structure and Replication</h1>
        <h2>1.1 DNA Double Helix</h2>
        <p>Deoxyribonucleic acid (DNA) is the hereditary material in humans and almost all other organisms. The structure of DNA was first described by James Watson and Francis Crick in 1953, based on X-ray crystallography data from Rosalind Franklin.</p>
        
        <h3>Basic Components</h3>
        <p>DNA is composed of four types of nucleotides, each containing:</p>
        <ul>
          <li>A phosphate group</li>
          <li>A five-carbon sugar (deoxyribose)</li>
          <li>One of four nitrogenous bases: Adenine (A), Thymine (T), Guanine (G), or Cytosine (C)</li>
        </ul>
        
        <h3>Double Helix Structure</h3>
        <p>The DNA molecule consists of two polynucleotide strands that wind around each other to form a double helix. The key features include:</p>
        <ul>
          <li><strong>Antiparallel strands:</strong> The two strands run in opposite directions (5' to 3' and 3' to 5')</li>
          <li><strong>Complementary base pairing:</strong> A always pairs with T, and G always pairs with C</li>
          <li><strong>Hydrogen bonding:</strong> Two hydrogen bonds between A-T pairs, three between G-C pairs</li>
        </ul>`
      }
    ]
  }
];

export const dummyReadingProgress: ReadingProgress[] = [
  {
    textbookId: 'physics-101',
    currentPage: 47,
    totalTimeRead: 245, // 4 hours 5 minutes
    pagesRead: [1, 2, 46, 47],
    lastReadAt: new Date('2024-01-20T14:30:00'),
    completionPercentage: 13.4 // 47/350 pages
  },
  {
    textbookId: 'calc-advanced',
    currentPage: 85,
    totalTimeRead: 180, // 3 hours
    pagesRead: [1, 2, 3, 4, 5, 31, 32, 56, 57, 84, 85],
    lastReadAt: new Date('2024-01-19T16:45:00'),
    completionPercentage: 16.6 // 85/512 pages
  },
  {
    textbookId: 'bio-molecular',
    currentPage: 1,
    totalTimeRead: 25,
    pagesRead: [1],
    lastReadAt: new Date('2024-01-18T10:15:00'),
    completionPercentage: 0.2 // 1/428 pages
  }
];

export const getTextbookById = (id: string): Textbook | undefined => {
  return dummyTextbooks.find(book => book.metadata.id === id);
};

export const getPageContent = (textbookId: string, pageNumber: number): string | undefined => {
  const textbook = getTextbookById(textbookId);
  const page = textbook?.pages.find(p => p.pageNumber === pageNumber);
  return page?.content;
};

export const getChapterByPage = (textbookId: string, pageNumber: number) => {
  const textbook = getTextbookById(textbookId);
  return textbook?.chapters.find(
    chapter => pageNumber >= chapter.startPage && pageNumber <= chapter.endPage
  );
};

export const getReadingProgress = (textbookId: string): ReadingProgress | undefined => {
  return dummyReadingProgress.find(progress => progress.textbookId === textbookId);
};