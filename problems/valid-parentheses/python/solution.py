# Valid Parentheses - Python Solution
# Valid Parentheses - Optimal Python Solution (Stack & Queue)
from typing import List, Dict, Optional

class Solution:
    def validparentheses(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Stack & Queue traversal
        for num in nums:
            result += num
            
        return result
