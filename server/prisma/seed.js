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
      hex_code: "#0A5EB0"
    }
  });

  const red = await prisma.color.upsert({
    where: { name: "Red" },
    update: {},
    create: {
      name: "Red",
      hex_code: "#D84040"
    }
  });
  
  const green = await prisma.color.upsert({
    where: { name: "Green" },
    update: {},
    create: {
      name: "Green",
      hex_code: "#5CB338"
    }
  });

  const white = await prisma.color.upsert({
    where: { name: "White" },
    update: {},
    create: {
      name: "White",
      hex_code: "#FFFFFF"
    }
  });

  const black = await prisma.color.upsert({
    where: { name: "Black" },
    update: {},
    create: {
      name: "Black",
      hex_code: "#191919"
    }
  });

  const yellow = await prisma.color.upsert({
    where: { name: "Yellow" },
    update: {},
    create: {
      name: "Yellow",
      hex_code: "#ECE852"
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
      subcategory_id: curtains.id,
      color_id: blue.id
    },
    {
      name: "LOREM-B",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 87.99,
      image: defaultProductImage,
      stock: 100,
      subcategory_id: curtains.id,
      color_id: yellow.id
    },
    {
      name: "LOREM-C",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 30,
      image: defaultProductImage,
      stock: 290,
      subcategory_id: cushions.id,
      color_id: yellow.id
    },
    {
      name: "LOREM-D",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 100.97,
      image: defaultProductImage,
      stock: 200,
      subcategory_id: cushions.id,
      color_id: black.id
    },
    {
      name: "LOREM-E",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 150.99,
      image: defaultProductImage,
      stock: 30,
      subcategory_id: rugs.id,
      color_id: white.id
    },
    {
      name: "LOREM-F",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 12.99,
      image: defaultProductImage,
      stock: 50,
      subcategory_id: rugs.id,
      color_id: blue.id
    },
    {
      name: "LOREM-G",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 40.99,
      image: defaultProductImage,
      stock: 150,
      subcategory_id: artificialPlants.id,
      color_id: green.id
    },
    {
      name: "LOREM-H",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 541.99,
      image: defaultProductImage,
      stock: 170,
      subcategory_id: artificialPlants.id,
      color_id: red.id
    },
    {
      name: "LOREM-I",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 89.99,
      image: defaultProductImage,
      stock: 75,
      subcategory_id: vases.id,
      color_id: red.id
    },
    {
      name: "LOREM-J",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 120.99,
      image: defaultProductImage,
      stock: 90,
      subcategory_id: vases.id,
      color_id: red.id
    },
    {
      name: "LOREM-K",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 100.99,
      image: defaultProductImage,
      stock: 20,
      subcategory_id: wallArt.id,
      color_id: yellow.id
    },
    {
      name: "LOREM-L",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 120,
      image: defaultProductImage,
      stock: 290,
      subcategory_id: wallArt.id,
      color_id: black.id
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
          connect: { id: product.subcategory_id }
        },
        color: {
          connect: { id: product.color_id }
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