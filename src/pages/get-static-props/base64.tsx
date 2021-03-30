import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getImageFilePaths } from "@/lib/get-image-file-paths";
import { getImage } from "@plaiceholder/next";
import { getBase64 } from "@plaiceholder/base64";
import { Layout } from "@/components/layout";
import { grid, gridItem, gridItemPlaceholder } from "@/styles";

const getImagesAndPlaceholders = async () => {
  const images = getImageFilePaths();

  return Promise.all(
    images.map(async (path) => {
      const image = await getImage(path);
      const base64 = await getBase64(image);

      return {
        src: path,
        base64,
      };
    })
  ).then((values) => values);
};

export const getStaticProps = async () => {
  const images = await getImagesAndPlaceholders();

  return {
    props: { images },
  };
};

const GetStaticPropsBase64 = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => (
  <Layout style={grid}>
    {props.images.map(({ src, base64 }) => (
      <div key={src} style={gridItem}>
        <img aria-hidden="true" style={gridItemPlaceholder} src={base64} />
        <Image src={src} layout="fill" />
      </div>
    ))}
  </Layout>
);

export default GetStaticPropsBase64;
