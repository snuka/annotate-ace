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
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="/src/assets/position-time-graph.jpg" alt="Position vs Time Graph" style="max-width: 100%; height: auto; border: 1px solid #ccc; border-radius: 8px;">
          <p style="font-size: 0.9em; color: #666; margin-top: 8px;"><em>Figure 1.1: Position vs Time graph showing the relationship between an object's position and time</em></p>
        </div>
        
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
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="/src/assets/velocity-time-graph.jpg" alt="Velocity vs Time Graph" style="max-width: 100%; height: auto; border: 1px solid #ccc; border-radius: 8px;">
          <p style="font-size: 0.9em; color: #666; margin-top: 8px;"><em>Figure 1.2: Velocity vs Time graph demonstrating constant acceleration</em></p>
        </div>
        
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
        pageNumber: 3,
        chapterId: 'ch1',
        sectionId: 's1-1',
        content: `<h3>Example Problem: Free Fall</h3>
        <p>Consider a ball dropped from the top of a building that is 45 meters high. Assuming no air resistance and g = 9.8 m/s², let's find how long it takes to reach the ground and its velocity upon impact.</p>
        
        <h4>Given:</h4>
        <ul>
          <li>Initial position: x₀ = 45 m</li>
          <li>Final position: x = 0 m</li>
          <li>Initial velocity: v₀ = 0 m/s</li>
          <li>Acceleration: a = -g = -9.8 m/s²</li>
        </ul>
        
        <h4>Solution:</h4>
        <p>Using the kinematic equation: x = x₀ + v₀t + ½at²</p>
        <p>0 = 45 + 0·t + ½(-9.8)t²</p>
        <p>0 = 45 - 4.9t²</p>
        <p>t² = 45/4.9 ≈ 9.18</p>
        <p><strong>t ≈ 3.03 seconds</strong></p>
        
        <p>To find the final velocity: v = v₀ + at</p>
        <p>v = 0 + (-9.8)(3.03)</p>
        <p><strong>v ≈ -29.7 m/s</strong></p>
        
        <p>The negative sign indicates the velocity is directed downward.</p>`
      },
      {
        pageNumber: 4,
        chapterId: 'ch1',
        sectionId: 's1-1',
        content: `<h3>Two-Dimensional Motion</h3>
        <p>Real-world motion often occurs in two or three dimensions. When analyzing 2D motion, we can break it down into separate x and y components, each following the same kinematic principles.</p>
        
        <h4>Projectile Motion</h4>
        <p>Projectile motion is a special case of 2D motion where an object is launched into the air and moves under the influence of gravity alone. Key characteristics include:</p>
        
        <ul>
          <li>Horizontal velocity remains constant (no horizontal acceleration)</li>
          <li>Vertical motion has constant acceleration due to gravity</li>
          <li>The trajectory follows a parabolic path</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="/src/assets/projectile-motion.jpg" alt="Projectile Motion Diagram" style="max-width: 100%; height: auto; border: 1px solid #ccc; border-radius: 8px;">
          <p style="font-size: 0.9em; color: #666; margin-top: 8px;"><em>Figure 1.3: Projectile motion showing velocity components at different points along the trajectory</em></p>
        </div>
        
        <p>The equations for projectile motion are:</p>
        <p><strong>Horizontal: x = x₀ + v₀ₓt</strong></p>
        <p><strong>Vertical: y = y₀ + v₀ᵧt - ½gt²</strong></p>
        
        <p>Where v₀ₓ and v₀ᵧ are the initial velocity components in the x and y directions, respectively.</p>`
      },
      {
        pageNumber: 5,
        chapterId: 'ch1',
        sectionId: 's1-1',
        content: `<h3>Circular Motion</h3>
        <p>When an object moves in a circular path at constant speed, it experiences uniform circular motion. Despite maintaining constant speed, the object is accelerating because its velocity direction is constantly changing.</p>
        
        <h4>Centripetal Acceleration</h4>
        <p>The acceleration directed toward the center of the circular path is called centripetal acceleration:</p>
        <p><strong>aᶜ = v²/r = ω²r</strong></p>
        
        <p>Where:</p>
        <ul>
          <li>v is the speed of the object</li>
          <li>r is the radius of the circular path</li>
          <li>ω is the angular velocity</li>
        </ul>
        
        <h4>Period and Frequency</h4>
        <p>The <strong>period (T)</strong> is the time required for one complete revolution:</p>
        <p><strong>T = 2πr/v = 2π/ω</strong></p>
        
        <p>The <strong>frequency (f)</strong> is the number of revolutions per unit time:</p>
        <p><strong>f = 1/T = v/(2πr) = ω/(2π)</strong></p>
        
        <h3>Practice Problems</h3>
        <ol>
          <li>A car travels around a circular track of radius 100 m at a constant speed of 20 m/s. Calculate its centripetal acceleration.</li>
          <li>A ball is thrown horizontally from a cliff 80 m high with an initial velocity of 25 m/s. How far from the base of the cliff does it land?</li>
        </ol>`
      },
      {
        pageNumber: 21,
        chapterId: 'ch1',
        sectionId: 's1-2',
        content: `<h2>1.2 Dynamics</h2>
        <p>Dynamics is the branch of mechanics that deals with the causes of motion - the forces that act on objects and the resulting motion. This section introduces the fundamental concept of force and its relationship to motion.</p>
        
        <h3>What is Force?</h3>
        <p>A force is a push or pull that can cause an object to accelerate, decelerate, change direction, or deform. Forces are vector quantities, meaning they have both magnitude and direction.</p>
        
        <h4>Types of Forces</h4>
        <ul>
          <li><strong>Contact Forces:</strong> Forces that require physical contact
            <ul>
              <li>Normal force - perpendicular to surfaces</li>
              <li>Friction force - opposes motion</li>
              <li>Tension force - through strings, cables, ropes</li>
              <li>Applied force - push or pull by a person or object</li>
            </ul>
          </li>
          <li><strong>Field Forces:</strong> Forces that act at a distance
            <ul>
              <li>Gravitational force</li>
              <li>Electric force</li>
              <li>Magnetic force</li>
            </ul>
          </li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="/src/assets/free-body-diagram.jpg" alt="Free Body Diagram" style="max-width: 100%; height: auto; border: 1px solid #ccc; border-radius: 8px;">
          <p style="font-size: 0.9em; color: #666; margin-top: 8px;"><em>Figure 1.4: Free body diagram showing various forces acting on an object</em></p>
        </div>`
      },
      {
        pageNumber: 22,
        chapterId: 'ch1',
        sectionId: 's1-2',
        content: `<h3>Free Body Diagrams</h3>
        <p>A free body diagram is a simplified representation of an object showing all the forces acting on it. These diagrams are essential tools for analyzing force problems.</p>
        
        <h4>Steps to Draw a Free Body Diagram:</h4>
        <ol>
          <li>Isolate the object of interest</li>
          <li>Identify all forces acting on the object</li>
          <li>Draw vectors representing each force</li>
          <li>Label each force with its magnitude and direction</li>
          <li>Choose a coordinate system</li>
        </ol>
        
        <h3>Newton's Laws Preview</h3>
        <p>Sir Isaac Newton formulated three fundamental laws that describe the relationship between forces and motion:</p>
        
        <div style="background-color: #f0f8ff; padding: 15px; border-left: 4px solid #4169e1; margin: 20px 0;">
          <h4>Newton's Three Laws:</h4>
          <ol>
            <li><strong>First Law (Inertia):</strong> An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by a net external force.</li>
            <li><strong>Second Law (F = ma):</strong> The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</li>
            <li><strong>Third Law (Action-Reaction):</strong> For every action, there is an equal and opposite reaction.</li>
          </ol>
        </div>
        
        <p>We will explore each of these laws in detail in the following chapters.</p>`
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
        
        <h4>Examples of Inertia:</h4>
        <ul>
          <li>When a car suddenly stops, passengers continue moving forward</li>
          <li>A coin placed on a card will fall straight down when the card is quickly pulled away</li>
          <li>When stirring coffee, the liquid continues to swirl even after you stop stirring</li>
        </ul>
        
        <h3>Balanced vs. Unbalanced Forces</h3>
        <p>When multiple forces act on an object, we must consider their vector sum, called the net force or resultant force. If the net force is zero, the forces are balanced, and the object's motion remains unchanged.</p>
        
        <p><strong>ΣF = 0</strong> (for balanced forces)</p>
        
        <p>When the net force is not zero, the forces are unbalanced, and the object's motion will change according to Newton's Second Law.</p>`
      },
      {
        pageNumber: 96,
        chapterId: 'ch3',
        sectionId: 's3-1',
        content: `<h1>Chapter 3: Energy and Work</h1>
        <h2>3.1 Work and Kinetic Energy</h2>
        <p>Energy is one of the most fundamental concepts in physics. It represents the ability to do work or cause change. In this chapter, we'll explore different forms of energy and how they relate to motion and forces.</p>
        
        <h3>Definition of Work</h3>
        <p>In physics, work is done when a force acts on an object and causes it to move in the direction of the force. The mathematical definition of work is:</p>
        
        <p><strong>W = F⃗ · d⃗ = Fd cos θ</strong></p>
        
        <p>Where:</p>
        <ul>
          <li>W is the work done</li>
          <li>F is the magnitude of the force</li>
          <li>d is the displacement</li>
          <li>θ is the angle between the force and displacement vectors</li>
        </ul>
        
        <h4>Important Points about Work:</h4>
        <ul>
          <li>Work is a scalar quantity (has magnitude but no direction)</li>
          <li>The SI unit of work is the joule (J)</li>
          <li>Work can be positive, negative, or zero</li>
          <li>No work is done if there's no displacement or if the force is perpendicular to displacement</li>
        </ul>
        
        <h3>Kinetic Energy</h3>
        <p>Kinetic energy is the energy possessed by an object due to its motion. It is defined as:</p>
        <p><strong>KE = ½mv²</strong></p>
        
        <p>Where m is the mass and v is the speed of the object.</p>`
      },
      {
        pageNumber: 97,
        chapterId: 'ch3',
        sectionId: 's3-1',
        content: `<h3>Work-Energy Theorem</h3>
        <p>The work-energy theorem states that the net work done on an object equals the change in its kinetic energy:</p>
        
        <p><strong>W_net = ΔKE = KE_final - KE_initial</strong></p>
        <p><strong>W_net = ½mv_f² - ½mv_i²</strong></p>
        
        <p>This theorem provides a powerful tool for solving problems involving motion and forces without explicitly dealing with acceleration and time.</p>
        
        <h4>Example Problem:</h4>
        <p>A 1000 kg car accelerates from 15 m/s to 25 m/s. How much work was done on the car?</p>
        
        <p><strong>Solution:</strong></p>
        <p>Initial KE = ½(1000)(15)² = ½(1000)(225) = 112,500 J</p>
        <p>Final KE = ½(1000)(25)² = ½(1000)(625) = 312,500 J</p>
        <p>Work done = 312,500 - 112,500 = <strong>200,000 J</strong></p>
        
        <h3>Power</h3>
        <p>Power is the rate at which work is done or energy is transferred:</p>
        
        <p><strong>P = W/t = F⃗ · v⃗</strong></p>
        
        <p>The SI unit of power is the watt (W), where 1 W = 1 J/s.</p>
        
        <p>Common power units include:</p>
        <ul>
          <li>Horsepower (hp): 1 hp = 746 W</li>
          <li>Kilowatt (kW): 1 kW = 1000 W</li>
        </ul>`
      },
      {
        pageNumber: 121,
        chapterId: 'ch3',
        sectionId: 's3-2',
        content: `<h2>3.2 Potential Energy</h2>
        <p>Potential energy is stored energy that depends on the position or configuration of an object. Unlike kinetic energy, which depends on motion, potential energy depends on an object's position relative to other objects or fields.</p>
        
        <h3>Gravitational Potential Energy</h3>
        <p>Near Earth's surface, gravitational potential energy is given by:</p>
        
        <p><strong>PE_gravity = mgh</strong></p>
        
        <p>Where:</p>
        <ul>
          <li>m is the mass of the object</li>
          <li>g is the acceleration due to gravity (9.8 m/s²)</li>
          <li>h is the height above a reference point</li>
        </ul>
        
        <h4>Key Points:</h4>
        <ul>
          <li>Gravitational PE depends on the choice of reference level</li>
          <li>Only changes in PE are physically meaningful</li>
          <li>PE increases with height, decreases as objects fall</li>
        </ul>
        
        <h3>Elastic Potential Energy</h3>
        <p>When a spring is compressed or stretched, it stores elastic potential energy:</p>
        
        <p><strong>PE_elastic = ½kx²</strong></p>
        
        <p>Where:</p>
        <ul>
          <li>k is the spring constant (measure of spring stiffness)</li>
          <li>x is the displacement from equilibrium position</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="/src/assets/energy-transformation.jpg" alt="Energy Transformation Diagram" style="max-width: 100%; height: auto; border: 1px solid #ccc; border-radius: 8px;">
          <p style="font-size: 0.9em; color: #666; margin-top: 8px;"><em>Figure 3.1: Energy transformation in a roller coaster showing the conversion between potential and kinetic energy</em></p>
        </div>`
      },
      {
        pageNumber: 141,
        chapterId: 'ch3',
        sectionId: 's3-3',
        content: `<h2>3.3 Conservation of Energy</h2>
        <p>The law of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another. In a closed system, the total energy remains constant.</p>
        
        <h3>Mechanical Energy</h3>
        <p>Mechanical energy is the sum of kinetic and potential energies:</p>
        
        <p><strong>E_mechanical = KE + PE = ½mv² + mgh</strong></p>
        
        <p>In the absence of friction and other non-conservative forces, mechanical energy is conserved:</p>
        
        <p><strong>E_initial = E_final</strong></p>
        <p><strong>KE_i + PE_i = KE_f + PE_f</strong></p>
        
        <h4>Example: Pendulum Motion</h4>
        <p>Consider a pendulum swinging back and forth. At the highest points:</p>
        <ul>
          <li>Velocity = 0, so KE = 0</li>
          <li>Height is maximum, so PE is maximum</li>
          <li>Total energy = PE_max</li>
        </ul>
        
        <p>At the lowest point:</p>
        <ul>
          <li>Height = 0 (reference), so PE = 0</li>
          <li>Velocity is maximum, so KE is maximum</li>
          <li>Total energy = KE_max</li>
        </ul>
        
        <p>Since energy is conserved: PE_max = KE_max</p>
        
        <h3>Energy in Real Systems</h3>
        <p>In real-world situations, some mechanical energy is often "lost" to:</p>
        <ul>
          <li>Friction (converts to thermal energy)</li>
          <li>Air resistance</li>
          <li>Sound energy</li>
          <li>Deformation energy</li>
        </ul>
        
        <p>However, energy is never truly lost - it's transformed into other forms that may not be easily recoverable as mechanical energy.</p>`
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