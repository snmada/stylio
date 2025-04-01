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

  const blue = await prisma.color.upsert({
    where: { name: "Blue" },
    update: {},
    create: {
      name: "Blue",
      hexCode: "#0A5EB0"
    }
  });

  const red = await prisma.color.upsert({
    where: { name: "Red" },
    update: {},
    create: {
      name: "Red",
      hexCode: "#D84040"
    }
  });
  
  const green = await prisma.color.upsert({
    where: { name: "Green" },
    update: {},
    create: {
      name: "Green",
      hexCode: "#5CB338"
    }
  });

  const white = await prisma.color.upsert({
    where: { name: "White" },
    update: {},
    create: {
      name: "White",
      hexCode: "#FFFFFF"
    }
  });

  const black = await prisma.color.upsert({
    where: { name: "Black" },
    update: {},
    create: {
      name: "Black",
      hexCode: "#191919"
    }
  });

  const yellow = await prisma.color.upsert({
    where: { name: "Yellow" },
    update: {},
    create: {
      name: "Yellow",
      hexCode: "#ECE852"
    }
  });

  const defaultProductImage = "default-product-image.jpg";

  const products = [
    {
      name: "LOREM-A",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 50.99,
      image: defaultProductImage,
      stock: 150,
      subcategoryId: curtains.id,
      colorId: blue.id
    },
    {
      name: "LOREM-B",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 87.99,
      image: defaultProductImage,
      stock: 100,
      subcategoryId: curtains.id,
      colorId: yellow.id
    },
    {
      name: "LOREM-C",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 30,
      image: defaultProductImage,
      stock: 290,
      subcategoryId: cushions.id,
      colorId: yellow.id
    },
    {
      name: "LOREM-D",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 100.97,
      image: defaultProductImage,
      stock: 200,
      subcategoryId: cushions.id,
      colorId: black.id
    },
    {
      name: "LOREM-E",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 150.99,
      image: defaultProductImage,
      stock: 30,
      subcategoryId: rugs.id,
      colorId: white.id
    },
    {
      name: "LOREM-F",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 12.99,
      image: defaultProductImage,
      stock: 50,
      subcategoryId: rugs.id,
      colorId: blue.id
    },
    {
      name: "LOREM-G",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 40.99,
      image: defaultProductImage,
      stock: 150,
      subcategoryId: artificialPlants.id,
      colorId: green.id
    },
    {
      name: "LOREM-H",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 541.99,
      image: defaultProductImage,
      stock: 170,
      subcategoryId: artificialPlants.id,
      colorId: red.id
    },
    {
      name: "LOREM-I",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 89.99,
      image: defaultProductImage,
      stock: 75,
      subcategoryId: vases.id,
      colorId: red.id
    },
    {
      name: "LOREM-J",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 120.99,
      image: defaultProductImage,
      stock: 90,
      subcategoryId: vases.id,
      colorId: red.id
    },
    {
      name: "LOREM-K",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 100.99,
      image: defaultProductImage,
      stock: 20,
      subcategoryId: wallArt.id,
      colorId: yellow.id
    },
    {
      name: "LOREM-L",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 120,
      image: defaultProductImage,
      stock: 290,
      subcategoryId: wallArt.id,
      colorId: black.id
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
        stock: product.stock,
        subcategory: {
          connect: { id: product.subcategoryId }
        },
        color: {
          connect: { id: product.colorId }
        },
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