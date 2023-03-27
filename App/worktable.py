def create_tiles():
    suites = ['Bamboo', 'Character', 'Circle']
    honors = ['East', 'South', 'West', 'North', 'Red', 'Green', 'White']
    tiles = []
    for suite in suites:
        for i in range(1, 10):
            tiles.append(suite + str(i))
    for honor in honors:
        tiles.append(honor)
    return tiles

for i in create_tiles():
    print(i)
    
print(create_tiles())