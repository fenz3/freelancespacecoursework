import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create categories with subcategories
  const categories = [
    {
      name: 'Programming & Tech',
      subcategories: [
        'Software Development',
        'Web Applications',
        'Desktop Applications',
        'APIs & Integrations',
        'Databases',
        'Scripting',
        'QA & Review',
        'User Testing',
      ],
    },
    {
      name: 'Design & Creative',
      subcategories: [
        'Logo Design',
        'Photoshop Editing',
        'Presentation Design',
        'Web & Mobile Design',
        'Fonts & Typography',
        'Architecture & Interior Design',
        'Video Editing',
      ],
    },
    {
      name: 'Sales & Marketing',
      subcategories: [
        'Social Media Management',
        'Lead Generation',
        'SEO',
        'Facebook Advertising',
        'Marketing Strategy',
        'Video Marketing',
      ],
    },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: {
        name: category.name,
        subcategories: {
          create: category.subcategories.map((subcategory) => ({
            name: subcategory,
          })),
        },
      },
    });
  }

  console.log('Categories and subcategories created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
