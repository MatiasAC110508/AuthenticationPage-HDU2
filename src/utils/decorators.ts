// Method decorator that injects default values into userData
export function withUserDefaults(
  _target: object,
  _propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor {

  // descriptor.value is the original method being decorated
  // It is cast to a function with a known signature for type safety
  const original = descriptor.value as (
    userData: Record<string, unknown>,
    ...rest: unknown[]
  ) => unknown;

  // We replace the original method with a new one
  descriptor.value = function (
    this: unknown,
    userData: Record<string, unknown>,
    ...rest: unknown[]
  ) {

    // Creates a new object by merging incoming data with default values
    // Spread operator ensures existing fields are preserved, but defaults are added/overwritten
    const enriched: Record<string, unknown> = {
      ...userData,
      role: "user",
      createdAt: Date.now(),
    };

    // Calls the original method
    // apply(...) keeps the correct "this" context and passes arguments as an array
    return original.apply(this, [enriched, ...rest]);
  };

  // Return the modified descriptor so the method gets replaced
  return descriptor;
}