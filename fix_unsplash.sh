sed -i 's|"https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=600"||g' src/data.ts
sed -i 's|"https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=600"||g' src/data.ts
sed -i 's|"https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600"||g' src/data.ts
sed -i 's|"https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=600"||g' src/data.ts
sed -i 's|"https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600"||g' src/data.ts
sed -i 's|"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600"||g' src/data.ts

# cleanup the empty arrays
sed -i 's|works: \[.*\]|works: \[\]|g' src/data.ts
