import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

interface RatingProps {
  value: number;
  onChange: (newValue: number) => void;
}

export const RepositoryRating = ({ value, onChange }: RatingProps) => {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating
        name="repository-rating"
        value={value}
        onChange={(event, newValue) => {
          if (newValue !== null) {
            onChange(newValue);
          }
        }}
      />
    </Box>
  );
};
