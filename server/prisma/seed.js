import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const textiles = await prisma.category.upsert({
    where: { name: "Textiles" },
    update: {},
    create: {
      name: "Textiles"
    }
  });

  const decorativeAccessories = await prisma.category.upsert({
    where: { name: "Decorative Accessories" },
    update: {},
    create: {
      name: "Decorative Accessories"
    }
  });

  const curtains = await prisma.subcategory.upsert({
    where: { name: "Curtains" },
    update: {},
    create: {
      name: "Curtains",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "jon-tyson-SlpsgiZsSNk-unsplash.jpg",
      category: {
        connect: { id: textiles.id }
      }
    }
  });

  const cushions = await prisma.subcategory.upsert({
    where: { name: "Cushions" },
    update: {},
    create: {
      name: "Cushions",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "designecologist-SQuY313aZyA-unsplash.jpg",
      category: {
        connect: { id: textiles.id }
      }
    }
  });

  const rugs = await prisma.subcategory.upsert({
    where: { name: "Rugs" },
    update: {},
    create: {
      name: "Rugs",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "sina-saadatmand-gB9hryu1q40-unsplash.jpg",
      category: {
        connect: { id: textiles.id }
      }
    }
  });

  const artificialPlants = await prisma.subcategory.upsert({
    where: { name: "Artificial plants" },
    update: {},
    create: {
      name: "Artificial plants",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "galina-n-miziNqvJx5M-unsplash.jpg",
      category: {
        connect: { id: decorativeAccessories.id }
      }
    }
  });

  const vases = await prisma.subcategory.upsert({
    where: { name: "Vases" },
    update: {},
    create: {
      name: "Vases",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "yana-hurska-zeGT9j4ltRA-unsplash.jpg",
      category: {
        connect: { id: decorativeAccessories.id }
      }
    }
  });

  const wallArt = await prisma.subcategory.upsert({
    where: { name: "Wall art" },
    update: {},
    create: {
      name: "Wall art",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "jonny-caspari-KuudDjBHIlA-unsplash.jpg",
      category: {
        connect: { id: decorativeAccessories.id }
      }
    }
  });

  const defaultProductImage = "default-product-image.jpg";

  const products = [
    {
      name: "LOREM-A",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 50.99,
      image: defaultProductImage,
      subcategory_id: curtains.id,
      stock: 150
    },
    {
      name: "LOREM-B",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 87.99,
      image: defaultProductImage,
      subcategory_id: curtains.id,
      stock: 100
    },
    {
      name: "LOREM-C",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 30,
      image: defaultProductImage,
      subcategory_id: cushions.id,
      stock: 290
    },
    {
      name: "LOREM-D",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 100.97,
      image: defaultProductImage,
      subcategory_id: cushions.id,
      stock: 200
    },
    {
      name: "LOREM-E",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 150.99,
      image: defaultProductImage,
      subcategory_id: rugs.id,
      stock: 30
    },
    {
      name: "LOREM-F",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 12.99,
      image: defaultProductImage,
      subcategory_id: rugs.id,
      stock: 50
    },
    {
      name: "LOREM-G",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 40.99,
      image: defaultProductImage,
      subcategory_id: artificialPlants.id,
      stock: 150
    },
    {
      name: "LOREM-H",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 541.99,
      image: defaultProductImage,
      subcategory_id: artificialPlants.id,
      stock: 170
    },
    {
      name: "LOREM-I",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 89.99,
      image: defaultProductImage,
      subcategory_id: vases.id,
      stock: 75
    },
    {
      name: "LOREM-J",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 120.99,
      image: defaultProductImage,
      subcategory_id: vases.id,
      stock: 90
    },
    {
      name: "LOREM-K",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 100.99,
      image: defaultProductImage,
      subcategory_id: wallArt.id,
      stock: 20
    },
    {
      name: "LOREM-L",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 120,
      image: defaultProductImage,
      subcategory_id: wallArt.id,
      stock: 290
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        subcategory_id: product.subcategory_id,
        stock: product.stock
      },
    });
  }

  console.log("\x1b[32m%s\x1b[0m", "Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("Error seeding database", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });