
tiles = list(range(1, 10)) + list(range(11, 20)) + list(range(21, 30))
convert_table = {'bamboo1': 1, 'bamboo2': 2, 'bamboo3': 3, 'bamboo4': 4, 'bamboo5': 5, 'bamboo6': 6, 'bamboo7': 7, 'bamboo8': 8, 'bamboo9': 9, 'wan1': 11, 'wan2': 12, 'wan3': 13, 'wan4': 14,
                 'wan5': 15, 'wan6': 16, 'wan7': 17, 'wan8': 18, 'wan9': 19, 'circle1': 21, 'circle2': 22, 'circle3': 23, 'circle4': 24, 'circle5': 25, 'circle6': 26, 'circle7': 27, 'circle8': 28, 'circle9': 29}

# conversion algorithm
# index = 1
# for i in ['bamboo', 'wan', 'circle']:
#     for j in range(1, 10):
#         print(f"'{i}{j}' : {index},", end='')
#         index += 1
#     index += 1
all_possible_combinations = [[1,1,1,2,2,2,3,3,3]]
    
'''
1-9 bamboo, 11-19 wan, 21-29 circle 
'''

def is_win(tile):
    # checking pair (base case)
    if len(tile) == 2 and tile[0] == tile[1]:
        return True
    
    # checking triplet
    for i in range(len(tile) - 2):
        if i < len(tile) - 4 and tile[i] == tile[i + 4]:
            return False
    
    for i in range(len(tile) - 2):
        tmp = tile[i]
        #shunzi
        if (tmp in tile) and (tmp + 1 in tile) and (tmp + 2 in tile):
            this_tile = tile.copy()
            this_tile.remove(tmp)
            this_tile.remove(tmp + 1)
            this_tile.remove(tmp + 2)
            if is_win(this_tile):
                return True
        #kezi
        elif tmp == tile[i + 2]:
            this_tile = tile.copy()
            if tile.count(tmp) == 3:
                this_tile.remove(tmp)
                this_tile.remove(tmp)
                this_tile.remove(tmp)
            elif tile.count(tmp) == 4:
                this_tile.remove(tmp)
                this_tile.remove(tmp)
                this_tile.remove(tmp)
                this_tile.remove(tmp)
            if is_win(this_tile):
                return True
    return False

def convert_tiles(tiles):
    new_lst = []
    for i in tiles:
        new_lst.append(convert_table[i])

    tiles = sorted(new_lst)
    return tiles

tiles1 = ['bamboo1', 'bamboo1', 'bamboo1', 'bamboo2', 'bamboo2', 'bamboo2', 'circle1', 'circle1', 'circle1', 'wan1', 'wan1', 'wan1', 'wan2', 'wan2']
tiles2 = ['bamboo1', 'bamboo1', 'bamboo1', 'bamboo2', 'bamboo2', 'bamboo2', 'circle1', 'circle1', 'circle1', 'wan1', 'wan1', 'wan1', 'wan2', 'wan2', 'wan2']
tiles3 = ['bamboo1', 'bamboo1', 'bamboo3', 'bamboo2', 'bamboo2', 'bamboo2', 'circle1', 'circle1', 'circle1', 'wan1', 'wan1', 'wan1', 'wan2', 'wan2']
tiles4 = ['bamboo7', 'bamboo8', 'bamboo9', 'bamboo2', 'bamboo2', 'bamboo2', 'circle1', 'circle2', 'circle3', 'wan1', 'wan1', 'wan1', 'wan2', 'wan2']

print(convert_tiles(tiles4))
print(is_win(convert_tiles(tiles1)) == True)
print(is_win(convert_tiles(tiles2)) == False)
print(is_win(convert_tiles(tiles3)) == False)
print(is_win([2, 2, 2, 7, 8, 9, 11, 11, 11, 12, 12, 21, 22, 23]) == True)
print(is_win([1,1,1,2,2,2,3,3,3,4,5,17,18,19]) == True)
print(is_win([1,2,3,4,5,6,7,8,9,11,12,13,14,15]) == False)
print(is_win([1,1,1,2,2,2,3,3,3,4,5,17,18,19]) == True)
print(is_win([1,1,1,1,2,2,2,2,3,3,3,4,4,4,5,5]) == True)
print(is_win([1,1,1,1,2,2,2,2,3,3,3,4,4,4,5]) == True)
print(is_win([1,1,1,1,2,2,2,2,3,3,3,4,4,4,5,5]) == True)
print(is_win([1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5]) == True)
print(is_win([4,5,5,5,6,11,12,12,13,13,23,28,29,23]))
# print(check_win(['bamboo1', 'bamboo1', 'bamboo2', 'bamboo2','bamboo3', 'bamboo3','bamboo4', 'bamboo4','bamboo5', 'bamboo5','bamboo6', 'bamboo6','bamboo7', 'bamboo7']))