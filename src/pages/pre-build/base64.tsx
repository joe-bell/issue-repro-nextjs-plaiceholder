import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getImageFilePaths } from "@/lib/get-image-file-paths";
import { plaiceholderBase64Map } from "@/pre-build/plaiceholder/base64";
import { Layout } from "@/components/layout";
import { grid, gridItem, gridItemPlaceholder } from "@/styles";

export const getStaticProps = async () => ({
  props: { images: getImageFilePaths(), plaiceholder: plaiceholderBase64Map },
});

const PreBuildBase64 = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => (
  <Layout style={grid}>
    {props.images.map((filePath) => (
      <div key={filePath} style={gridItem}>
        <img
          aria-hidden="true"
          style={gridItemPlaceholder}
          src={props.plaiceholder[filePath]}
        />
        <Image src={filePath} layout="fill" />
      </div>
    ))}
  </Layout>
);

export default PreBuildBase64;
