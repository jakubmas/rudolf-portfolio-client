import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  photoContainer: {
    maxWidth: '100%',
    boxShadow: `0px 7px 30px -10px ${theme.palette.text.primary}`
  }
}));

type ImageContainerProps = {
  srcImage: string;
  altImage: string;
  imageClass?: string;
};

export const ImageContainer: React.FC<ImageContainerProps> = ({
  srcImage,
  altImage,
  imageClass
}) => {
  const classes = useStyles();
  return (
    <img
      className={`${classes.photoContainer} ${imageClass && imageClass}`}
      src={srcImage}
      alt={altImage}
    />
  );
};
