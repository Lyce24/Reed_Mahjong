def create_tiles():
    suites = ['Bamboo', 'Character', 'Circle']
    honors = ['East', 'South', 'West', 'North', 'Red', 'Green', 'White']
    tiles = []
    for suite in suites:
        for i in range(1, 10):
            tiles.append(suite + str(i) + " = models.BooleanField(default=False)")
    for honor in honors:
        tiles.append(honor + " = models.BooleanField(default=False)")
    return tiles

for i in create_tiles():
    print(i)