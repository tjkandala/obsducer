# obsducer

## Motivation

## Performance

## Usage

Why you'd use obsducer:
1) You have many array transformations that could be generalized and composed 
2) You are transforming a very big array
3) Both of the above

Ways to use obsducer: 

1) executeObsducer: create observable from array, pipe all the operators you need, and immediately execute. Do this if you know you're only going to use this exact transducer/transformation in one place. You still get the performance advantage over native array method chaining, but you lose a little bit of (subjective) readability.

## API Reference

## Credits/Prior Art
